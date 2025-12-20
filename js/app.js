function spa() {
    return {
        // State route saat ini
        currentRoute: '',

        // Dataset contoh
        sampleDatasets: sampleDatasets,

        // Import file state
        uploadedFileText: '',
        csvHeaders: [],
        csvRows: [],
        selectedColumnIndex: null,
        columnValidation: {
          isNumeric: false,
          isEnough: false,
          count: 0
        },

        // Playground section state
        subject: '',
        rawInput: '',
        hasUserInput: false,
        minData: MIN_DATA_COUNT,
        parsedData: [],
        errorMessage: '',
        stats: null,
        frequencyTable: null,
        interpretation: null,
        isLoading: false,
        isProcessing: false,

        // Inisialisasi aplikasi SPA
        init() {
            // Baca hash saat halaman dimuat
            this.updateRoute();

            // Dengarkan perubahan hash (termasuk tombol back/forward)
            window.addEventListener('hashchange', () => {
                this.updateRoute();
            });

            document.getElementById('fileInput').addEventListener('change', (e) => {
              this.handleFileUpload(e.target.files[0]);
            });
        },

        // Perbarui route berdasarkan hash di URL
        updateRoute() {
            // Ambil hash tanpa tanda '#', lalu bersihkan slash jika ada
            let hash = window.location.hash.slice(1).toLowerCase();
            // Hilangkan leading slash jika ada (misal #/playground → playground)
            if (hash.startsWith('/')) {
                hash = hash.slice(1);
            }
            this.currentRoute = hash || ''; // default ke home jika kosong
        },

        // Navigasi ke route tertentu dengan mengubah hash
        goTo(route) {
            // route bisa '' (home), 'playground', 'import', dll.
            const path = route ? '#' + route : '#';
            if (window.location.hash !== path) {
                window.location.hash = path;
            } else {
                // Jika hash sama, trigger manual update
                this.updateRoute();
            }
        },

        // Gunakan dataset contoh yang dipilih dari accordion
        useDataset(dataset) {
          this.subject = dataset.subject;
          this.rawInput = dataset.data.join(', ');
          this.parseInput();

          // Tutup modal Bootstrap
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('exampleDatasetModal')
          );
          modal.hide();
        },

        get dataCount() {
          return this.parsedData.length;
        },

        get isDataValid() {
          return this.dataCount >= this.minData;
        },

        parseInput() {
          this.updateInputState();
          this.parsedData = parseNumericInput(this.rawInput);
        },

        async startProcess() {
          this.isLoading = true;

          // beri waktu agar loading terlihat
          await Utils.delay(500);
          this.isLoading = false;

          // parsing ulang sebagai sumber kebenaran
          const data = parseNumericInput(this.rawInput);

          const result = validateNumericData(data, this.minData);
          if (!result.valid) {
            UI.toast(result.message);
            return;
          }

          // Memanggil fungsi statistik dasar
          const n = count(data);
          const minVal = min(data);
          const maxVal = max(data);
          const rangeVal = range(data);

          // Simpan ke state
          this.stats = {
            n,
            min: minVal,
            max: maxVal,
            range: rangeVal
          };

          // Hitung jumlah kelas dengan aturan Sturges
          const k = sturges(n);

          // Simpan ke state
          this.stats.k = k;

          // Hitung lebar interval kelas
          const interval = intervalWidth(rangeVal, k);

          // Simpan ke state
          this.stats.interval = interval;

          const frequencyTable = buildFrequencyTable(
            data,
            minVal,
            interval,
            k
          );

          // simpan ke state
          this.frequencyTable = frequencyTable;

          this.interpretation = interpretFrequency(frequencyTable);
          this.isProcessing = true;
        },



        resetPlayground() {
          // input
          this.subject = '';
          this.rawInput = '';
          this.parsedData = [];
          this.hasUserInput = false;

          // hasil proses
          this.stats = null;
          this.frequencyTable = null;
          this.interpretation = null;

          // state UI
          this.isProcessing = false;

          // opsional: kembali ke atas halaman
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        triggerFileInput() {
          document.getElementById('fileInput').click();
        },

        handleFileUpload(file) {
          if (!file) return;

          const name = file.name.split('.').shift();
          const ext = file.name.split('.').pop().toLowerCase();
          if (!['txt', 'csv'].includes(ext)) {
            UI.toast('Format file tidak didukung.');
            return;
          }

          // Gunakan nama file (tanpa ekstensi) sebagai subject
          this.subject = `Distribusi Frekuensi ${name}`;

          const reader = new FileReader();
          reader.onload = () => {
            const text = reader.result.trim();
            this.uploadedFileText = text;

            if (Parser.isSimpleNumericFile(text)) {
              this.fillPlayground(text);
            } else {
              this.parseCsvTable(text);
            }
          };

          reader.readAsText(file);
        },

        fillPlayground(text) {
          this.rawInput = text;
          this.parseInput();

          bootstrap.Modal
            .getInstance(document.getElementById('importFileModal'))
            .hide();

          UI.toast(`${this.parsedData.length} data berhasil diimpor.`, 'success');
        },

        parseCsvTable(text) {
          const { headers, rows } = Parser.parseCsv(text);

          this.csvHeaders = headers;
          this.csvRows = rows;

          bootstrap.Modal
            .getInstance(document.getElementById('importFileModal'))
            .hide();

          new bootstrap.Modal(
            document.getElementById('chooseColumnModal')
          ).show();
        },

        confirmColumnSelection() {
          const colIndex = this.selectedColumnIndex;

          const columnData = this.csvRows
            .map(row => Number(row[colIndex]))
            .filter(v => !isNaN(v));

          if (columnData.length < this.minData) {
            UI.toast('Kolom terpilih tidak memiliki minimal 30 data numerik.');
            return;
          }

          this.rawInput = columnData.join(', ');
          this.parseInput();
          this.subject += ` pada kolom ${this.csvHeaders[colIndex]}`;

          bootstrap.Modal
            .getInstance(document.getElementById('chooseColumnModal'))
            .hide();

          if (this.currentRoute !== 'playground') {
            this.goTo('playground');
          }

          UI.toast(`${columnData.length} data berhasil diimpor dari kolom terpilih.`, 'success');
          this.resetFileUpload();
        },

        evaluateSelectedColumn() {
          if (this.selectedColumnIndex === null) {
            this.columnValidation = {
              isNumeric: false,
              isEnough: false,
              count: 0
            };
            return;
          }

          const values = this.csvRows.map(row => row[this.selectedColumnIndex]);

          const numericValues = values
            .map(v => Number(v))
            .filter(v => !isNaN(v));

          this.columnValidation = {
            isNumeric: numericValues.length === values.length,
            isEnough: numericValues.length >= this.minData,
            count: numericValues.length
          };
        },

        resetFileUpload() {
          this.uploadedFileText = '';
          this.csvHeaders = [];
          this.csvRows = [];
          this.selectedColumnIndex = null;
          this.columnValidation = {
            isNumeric: false,
            isEnough: false,
            count: 0
          };
          const fileInput = document.getElementById('fileInput');
          if (fileInput) {
            fileInput.value = '';
          }
        },

        updateInputState() {
          this.hasUserInput =
            this.subject.trim() !== '' ||
            this.rawInput.trim() !== '';
        },

        // Debug: trigger toast
        // Jalankan kode ini di console DevTools untuk mengetes fungsi toast:
        // spa().triggerToastTest()
        triggerToastTest() {
          UI.toast('Contoh pesan toast.');
        },

    }
}