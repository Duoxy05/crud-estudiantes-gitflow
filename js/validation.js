/**
 * Reglas de validación del formulario de estudiantes.
 * Devuelve un objeto { campo: mensaje } con los errores encontrados.
 */
const MATRICULA_PATTERN = /^\d{4}-\d{4}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return now.getFullYear() + '-' + month + '-' + day;
}

function validateStudent(data, existingStudents, currentId) {
  const errors = {};

  if (!data.matricula) {
    errors.matricula = 'La matrícula es obligatoria.';
  } else if (!MATRICULA_PATTERN.test(data.matricula)) {
    errors.matricula = 'Formato esperado: 2025-0001.';
  } else if (existingStudents.some(function (s) {
    return s.matricula === data.matricula && s.id !== currentId;
  })) {
    errors.matricula = 'Ya existe un estudiante con esa matrícula.';
  }

  if (!data.nombre) {
    errors.nombre = 'El nombre es obligatorio.';
  } else if (data.nombre.length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!data.email) {
    errors.email = 'El correo es obligatorio.';
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Escribe un correo válido.';
  }

  if (!data.carrera) {
    errors.carrera = 'Selecciona una carrera.';
  }

  if (!data.fechaIngreso) {
    errors.fechaIngreso = 'La fecha de ingreso es obligatoria.';
  } else if (data.fechaIngreso > todayISO()) {
    errors.fechaIngreso = 'La fecha no puede ser futura.';
  }

  return errors;
}
