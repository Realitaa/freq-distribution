window.UI = window.UI || {};

/**
 * Menampilkan pesan notifikasi toast kepada pengguna.
 *
 * @param {string} message - Pesan yang ingin ditampilkan
 * @param {'error'|'success'} [status='error'] - Jenis pesan
 */
window.UI.toast = function (message, status = 'error') {
  const bgColor = status === 'error' ? '--bs-danger' : '--bs-success';

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: getCssVar(bgColor),
    }
  }).showToast();
};
