/**
 * Mengambil nilai dari CSS Variable yang didefinisikan di :root
 * @param {string} name nama CSS Variable, misal '--bs-danger'
 * @returns {string} nilai dari CSS Variable tersebut, misal '#dc3545'
 */
function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
