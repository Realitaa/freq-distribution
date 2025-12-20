// Validasi data numerik

/**
 * Validasi resmi data numerik sebelum algoritma dijalankan
 * @param {number[]} data
 * @param {number} minLength
 * @returns {{ valid: boolean, message?: string }}
 */
function validateNumericData(data, minLength = 30) {
  if (!Array.isArray(data)) {
    return { valid: false, message: 'Data tidak valid.' };
  }

  if (data.length < minLength) {
    return {
      valid: false,
      message: `Jumlah data minimal ${minLength}.`
    };
  }

  // pastikan semua elemen benar-benar number
  const hasInvalid = data.some(v => typeof v !== 'number' || Number.isNaN(v));
  if (hasInvalid) {
    return { valid: false, message: 'Data harus berupa angka.' };
  }

  return { valid: true };
}

