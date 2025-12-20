function spa() {
    return {
        currentRoute: '',
        sampleDatasets: sampleDatasets,

        subject: '',
        rawInput: '',

        init() {
            // Baca hash saat halaman dimuat
            this.updateRoute();

            // Dengarkan perubahan hash (termasuk tombol back/forward)
            window.addEventListener('hashchange', () => {
                this.updateRoute();
            });
        },

        updateRoute() {
            // Ambil hash tanpa tanda '#', lalu bersihkan slash jika ada
            let hash = window.location.hash.slice(1).toLowerCase();
            // Hilangkan leading slash jika ada (misal #/playground → playground)
            if (hash.startsWith('/')) {
                hash = hash.slice(1);
            }
            this.currentRoute = hash || ''; // default ke home jika kosong
        },

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

        useDataset(dataset) {
          this.subject = dataset.subject;
          this.rawInput = dataset.data.join(', ');

          // Tutup modal Bootstrap
          const modal = bootstrap.Modal.getInstance(
            document.getElementById('exampleDatasetModal')
          );
          modal.hide();
        }
    }
}