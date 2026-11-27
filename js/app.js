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
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');

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
        '<td><div class="row-actions">' +
          '<button type="button" class="btn small" data-action="edit" data-id="' + escapeHtml(s.id) + '">Editar</button>' +
        '</div></td>' +
      '</tr>';
    }).join('');
  }

  let toastTimer = null;

  function notify(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.className = 'toast';
    }, 2500);
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
    formTitle.textContent = 'Nuevo estudiante';
    submitBtn.textContent = 'Guardar';
    cancelBtn.hidden = true;
  }

  // CREATE / UPDATE: guarda el formulario.
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = readForm();

    if (fields.id.value) {
      StudentStore.update(fields.id.value, data);
      notify('Estudiante actualizado.');
      resetForm();
      render();
      return;
    }

    StudentStore.add(data);
    notify('Estudiante registrado.');
    resetForm();
    render();
  });

  function startEdit(id) {
    const student = StudentStore.getById(id);
    if (!student) return;

    fields.id.value = student.id;
    fields.matricula.value = student.matricula;
    fields.nombre.value = student.nombre;
    fields.email.value = student.email;
    fields.carrera.value = student.carrera;
    fields.fechaIngreso.value = student.fechaIngreso;

    formTitle.textContent = 'Editar estudiante';
    submitBtn.textContent = 'Actualizar';
    cancelBtn.hidden = false;
    fields.nombre.focus();
  }

  tbody.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    if (button.dataset.action === 'edit') {
      startEdit(button.dataset.id);
    }
  });

  cancelBtn.addEventListener('click', resetForm);

  render();
})();
