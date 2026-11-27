/**
 * Convierte una fecha "AAAA-MM-DD" al formato DD/MM/AAAA.
 */
function formatDate(isoDate) {
  if (!isoDate) return '—';
  return new Date(isoDate).toLocaleDateString('es-DO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
