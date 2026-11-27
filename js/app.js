(function () {
  'use strict';

  const tbody = document.getElementById('student-rows');
  const count = document.getElementById('count');
  const form = document.getElementById('student-form');
  const fields = {
    id: document.getElementById('student-id'),
    matricula: document.getElementById('matricula'),
    nombre: document.getElementById('nombre'),
    email: document.getElementById('email'),
    carrera: document.getElementById('carrera'),
    fechaIngreso: document.getElementById('fechaIngreso')
  };

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

  function readForm() {
    return {
      matricula: fields.matricula.value.trim(),
      nombre: fields.nombre.value.trim(),
      email: fields.email.value.trim().toLowerCase(),
      carrera: fields.carrera.value,
      fechaIngreso: fields.fechaIngreso.value
    };
  }

  function resetForm() {
    form.reset();
    fields.id.value = '';
  }

  // CREATE / UPDATE: guarda el formulario.
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = readForm();

    StudentStore.add(data);
    resetForm();
    render();
  });

  render();
})();
