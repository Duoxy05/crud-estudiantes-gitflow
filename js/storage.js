/**
 * Capa de datos: guarda los estudiantes en localStorage.
 * Si localStorage no está disponible, los datos se mantienen en memoria.
 */
const StudentStore = (function () {
  'use strict';

  const STORAGE_KEY = 'crud-estudiantes:v1';

  const SEED = [
    { id: 's1', matricula: '2024-0153', nombre: 'Ana Martínez', email: 'ana.martinez@example.com', carrera: 'Desarrollo de Software', fechaIngreso: '2024-01-15' },
    { id: 's2', matricula: '2024-0378', nombre: 'Luis Peña', email: 'luis.pena@example.com', carrera: 'Seguridad Informática', fechaIngreso: '2024-05-06' },
    { id: 's3', matricula: '2025-0021', nombre: 'María Rosario', email: 'maria.rosario@example.com', carrera: 'Inteligencia Artificial', fechaIngreso: '2025-01-13' }
  ];

  let cache = null;

  function read() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      cache = raw ? JSON.parse(raw) : SEED.map(function (s) { return Object.assign({}, s); });
    } catch (error) {
      cache = SEED.map(function (s) { return Object.assign({}, s); });
    }
    return cache;
  }

  function write(list) {
    cache = list;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      // Sin localStorage: los cambios solo duran mientras la página esté abierta.
    }
  }

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  return {
    getAll: function () {
      return read().slice().sort(function (a, b) {
        return a.matricula.localeCompare(b.matricula);
      });
    },

    add: function (data) {
      const student = Object.assign({ id: newId() }, data);
      write(read().concat(student));
      return student;
    },

    getById: function (id) {
      return read().find(function (s) { return s.id === id; }) || null;
    },

    update: function (id, data) {
      write(read().map(function (s) {
        return s.id === id ? Object.assign({}, s, data, { id: id }) : s;
      }));
    }
  };
})();
