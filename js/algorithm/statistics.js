// Modul statistik dasar

/**
 * Menghitung jumlah data
 * @param {number[]} data
 * @returns {number}
 */
function count(data) {
  return Array.isArray(data) ? data.length : 0;
}

/**
 * Mencari nilai minimum
 * @param {number[]} data
 * @returns {number}
 */
function min(data) {
  return Math.min(...data);
}

/**
 * Mencari nilai maksimum
 * @param {number[]} data
 * @returns {number}
 */
function max(data) {
  return Math.max(...data);
}

/**
 * Menghitung range (max - min)
 * @param {number[]} data
 * @returns {number}
 */
function range(data) {
  return max(data) - min(data);
}

/**
 * Menentukan jumlah kelas menggunakan aturan Sturges
 * k = 1 + 3.322 * log10(n)
 * @param {number} n
 * @returns {number}
 */
function sturges(n) {
  return Math.ceil(1 + 3.322 * Math.log10(n));
}