function spa() {
    return {
        // State route saat ini
        currentRoute: '',

        // Dataset contoh
        sampleDatasets: sampleDatasets,

        // Playground section state
        subject: '',
        rawInput: '',
        minData: MIN_DATA_COUNT,
        parsedData: [],
        errorMessage: '',
        stats: null,
        frequencyTable: null,
        interpretation: null,
        isProcessing: false,

        // Inisialisasi aplikasi SPA
        init() {
            // Baca hash saat halaman dimuat
            this.updateRoute();

            // Dengarkan perubahan hash (termasuk tombol back/forward)
            window.addEventListener('hashchange', () => {
                this.updateRoute();
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
          this.parsedData = parseNumericInput(this.rawInput);
        },

        startProcess() {
          // parsing ulang sebagai sumber kebenaran
          const data = parseNumericInput(this.rawInput);

          const result = validateNumericData(data, this.minData);
          if (!result.valid) {
            this.showError(result.message);
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

          // hasil proses
          this.stats = null;
          this.frequencyTable = null;
          this.interpretation = null;

          // state UI
          this.isProcessing = false;

          // opsional: kembali ke atas halaman
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        showError(message) {
          Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: getCssVar('--bs-danger'),
            }
          }).showToast();
        },

        // Debug: trigger error toast
        // Jalankan kode ini di console DevTools untuk mengetes fungsi toast:
        // spa().triggerErrorTest()
        triggerErrorTest() {
          this.showError('Contoh pesan error validasi.');
        },

    }
}