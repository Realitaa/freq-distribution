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

          // valid → lanjut ke tahap berikutnya (statistik/algoritma)
          this.errorMessage = '';
          this.parsedData = data;

          // placeholder: nanti trigger analisis/statistik
          // this.goTo('process') atau tampilkan section proses
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