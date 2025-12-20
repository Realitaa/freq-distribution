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

