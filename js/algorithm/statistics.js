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
