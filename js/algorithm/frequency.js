// Algoritma distribusi frekuensi

/**
 * Membentuk kelas interval dan menghitung frekuensi tiap kelas
 * @param {number[]} data - data numerik
 * @param {number} minVal - nilai minimum
 * @param {number} interval - lebar interval kelas
 * @param {number} k - jumlah kelas
 * @returns {Array<{lower:number, upper:number, freq:number}>}
 */
function buildFrequencyTable(data, minVal, interval, k) {
  const table = [];
  let lower = minVal;

  for (let i = 1; i <= k; i++) {
    const upper = lower + interval;

    let freq = 0;

    if (i < k) {
      // kelas selain terakhir: [lower, upper)
      freq = data.filter(v => v >= lower && v < upper).length;
    } else {
      // kelas terakhir: [lower, upper]
      freq = data.filter(v => v >= lower && v <= upper).length;
    }

    table.push({
      lower,
      upper,
      freq
    });

    lower = upper;
  }

  return table;
}
