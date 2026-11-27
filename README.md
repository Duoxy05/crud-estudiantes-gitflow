# CRUD de Estudiantes · Git Flow

Proyecto de la **Tarea 3 de Programación III**: una aplicación web CRUD
(Crear, Leer, Actualizar y Eliminar) para registrar estudiantes, desarrollada
aplicando la metodología **Git Flow** con ramas `feature/`, `hotfix/` y
Pull Requests hacia `dev`, `qa` y `main`.

- **Repositorio:** https://github.com/Duoxy05/crud-estudiantes-gitflow
- **Demo en línea (GitHub Pages):** https://duoxy05.github.io/crud-estudiantes-gitflow/

## Funcionalidades

| Operación | Descripción |
|-----------|-------------|
| **Create** | Formulario para registrar un estudiante (matrícula, nombre, correo, carrera y fecha de ingreso). |
| **Read** | Tabla con todos los estudiantes, ordenados por matrícula, y contador total. |
| **Update** | Botón *Editar* que carga el estudiante en el formulario para modificarlo. |
| **Delete** | Botón *Eliminar* con confirmación previa. |
| Validación | Campos obligatorios, formato de matrícula (`2025-0001`), correo válido, fecha no futura y matrícula sin duplicados. |
| Persistencia | Los datos se guardan en el navegador con `localStorage`. |

## Tecnologías

- HTML5, CSS3 y JavaScript (sin frameworks ni dependencias).
- `localStorage` como almacenamiento.
- GitHub Pages para la publicación.

## Cómo ejecutarlo

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Duoxy05/crud-estudiantes-gitflow.git
   ```
2. Abrir `index.html` en cualquier navegador. No requiere instalación.

También se puede usar directamente desde la demo en línea.

## Estructura

```
├── index.html          # Interfaz
├── css/styles.css      # Estilos
└── js/
    ├── storage.js      # Capa de datos (localStorage)
    ├── date.js         # Formato de fechas
    ├── validation.js   # Reglas de validación
    └── app.js          # Lógica de la interfaz (CRUD)
```

## Estrategia de ramas (Git Flow)

| Rama | Propósito |
|------|-----------|
| `main` | Código estable, listo para producción. |
| `qa` | Versión en pruebas de calidad antes de pasar a producción. |
| `dev` | Rama de integración del desarrollo. |
| `feature/*` | Una rama por funcionalidad, creada desde `dev`. |
| `hotfix/*` | Correcciones urgentes, creadas desde `main`. |

Ramas de trabajo del proyecto:

| Rama | Contenido | Pull Requests |
|------|-----------|---------------|
| `feature/student-list` | Capa de datos y listado de estudiantes (Read) | → `dev`, → `qa`, → `main` |
| `feature/create-student` | Formulario de registro (Create) | → `dev`, → `qa`, → `main` |
| `feature/update-student` | Edición de estudiantes (Update) | → `dev`, → `qa`, → `main` |
| `feature/delete-student` | Eliminación con confirmación (Delete) | → `dev`, → `qa`, → `main` |
| `feature/validate-student-input` | Validaciones del formulario | → `dev`, → `qa`, → `main` |
| `hotfix/fix-date-format` | Corrige la fecha de ingreso que se mostraba un día antes | → `main`, → `dev`, → `qa` |

Cada rama `feature/` se crea desde `dev` y abre un Pull Request hacia `dev`,
luego hacia `qa` y finalmente hacia `main`. La rama `hotfix/` se crea desde
`main`, se integra primero en `main` y después en `dev` y `qa` para mantener
las tres ramas sincronizadas. Al final, todos los cambios quedan en `main`.
