// Parsing input data (textarea / CSV)

/**
 * Parsing input numerik dari textarea atau sumber lain
 * @param {string} rawInput
 * @returns {number[]} array angka valid
 */
function parseNumericInput(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return [];
  }

  return rawInput
    .split(/[\s,]+/)      // pisahkan dengan koma atau baris baru
    .map(v => Number(v))  // konversi ke number
    .filter(v => !isNaN(v));
}

window.Parser = {
  /**
   * Mengecek apakah file hanya berisi angka sederhana
   * (tanpa struktur tabel CSV).
   *
   * @param {string} text - Isi file
   * @returns {boolean}
   */
  isSimpleNumericFile(text) {
    return /^[\d\s,.\-]+$/.test(text);
  },

  /**
   * Parsing file CSV sederhana menjadi header dan baris data.
   *
   * @param {string} text - Isi file CSV
   * @returns {{ headers: string[], rows: string[][] }}
   */
  parseCsv(text) {
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(row =>
      row.split(',').map(cell => cell.trim())
    );

    return { headers, rows };
  }
};
