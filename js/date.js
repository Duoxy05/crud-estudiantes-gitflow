/**
 * Convierte una fecha "AAAA-MM-DD" al formato DD/MM/AAAA.
 *
 * No se usa new Date("AAAA-MM-DD") porque JavaScript interpreta ese texto
 * como medianoche UTC; en zonas horarias negativas (República Dominicana es
 * UTC-4) la fecha se mostraba un día antes de la registrada.
 */
function formatDate(isoDate) {
  if (!isoDate) return '—';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  return parts[2] + '/' + parts[1] + '/' + parts[0];
}
