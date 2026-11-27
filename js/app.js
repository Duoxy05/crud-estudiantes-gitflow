(function () {
  'use strict';

  const tbody = document.getElementById('student-rows');
  const count = document.getElementById('count');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // READ: dibuja la tabla con los estudiantes guardados.
  function render() {
    const students = StudentStore.getAll();
    const columns = document.querySelectorAll('thead th').length;

    count.textContent = students.length + (students.length === 1 ? ' estudiante' : ' estudiantes');

    if (students.length === 0) {
      tbody.innerHTML = '<tr><td colspan="' + columns + '" class="empty">No hay estudiantes registrados.</td></tr>';
      return;
    }

    tbody.innerHTML = students.map(function (s) {
      return '<tr>' +
        '<td>' + escapeHtml(s.matricula) + '</td>' +
        '<td>' + escapeHtml(s.nombre) + '</td>' +
        '<td>' + escapeHtml(s.email) + '</td>' +
        '<td>' + escapeHtml(s.carrera) + '</td>' +
        '<td>' + escapeHtml(formatDate(s.fechaIngreso)) + '</td>' +
      '</tr>';
    }).join('');
  }

  render();
})();
