window.Utils = {
  /**
   * Memberikan jeda waktu (delay) secara asynchronous.
   * Digunakan untuk simulasi proses perhitungan agar loading terlihat.
   *
   * @param {number} ms - Durasi delay dalam milidetik
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
