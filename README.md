# CloudSystem App

Gestión de tareas full‑stack desarrollada para la _Prueba Técnica – Cloud System_.
Utiliza **Django REST Framework** + **PostgreSQL** en el backend y **React 18 + Vite** en el frontend.

---

## Tabla de contenido

1. [Requisitos](#requisitos)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Instalación backend (`cloudsystem/`)](#instalación-backend)
4. [Instalación frontend (`frontend/`)](#instalación-frontend)
5. [Comandos rápidos](#comandos-rápidos)
6. [Pruebas automatizadas](#pruebas-automatizadas)
7. [Variables de entorno](#variables-de-entorno)
8. [Endpoints principales](#endpoints-principales)
9. [Notas y mejoras](#notas-y-mejoras)

---

## Requisitos

| Herramienta    | Versión mínima | Descarga                                                                                     |
| -------------- | -------------- | -------------------------------------------------------------------------------------------- |
| **Python**     | 3.12 (64‑bit)  | [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)       |
| **PostgreSQL** | 16             | [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/) |
| **Node.js**    | 20 LTS         | [https://nodejs.org/](https://nodejs.org/)                                                   |
| **Git**        | 2.40           | [https://git-scm.com/](https://git-scm.com/)                                                 |

> ⚠️ En Windows agrega Python, Node y Postgres a tu `PATH` durante la instalación.

---

## Estructura del proyecto

```
Proyectos/
├─ cloudsystem/      # Backend Django + DRF
│  ├─ config/
│  ├─ tasks/
│  └─ manage.py
└─ frontend/         # React 18 + Vite + Tailwind
```

---

## Instalación backend

> Carpeta `cloudsystem/`

```powershell
cd Proyectos\cloudsystem

# 1. Crear y activar entorno virtual
python -m venv venv
.\venv\Scripts\activate  # PowerShell/CMD

# 2. Instalar dependencias
pip install -r requirements.txt
# Si no existe, instala manualmente
pip install Django==5.2.1 djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers pytest pytest-django pytest-cov

# 3. Configurar base de datos -Agjunto un respaldo de la BDD en la raiz de la carpeta cloudsystem-
# Asegúrate de que PostgreSQL esté corriendo y crea la DB y el usuario:
# psql -U postgres
# CREATE DATABASE cloud_todo_db;
# CREATE USER cloud_user WITH PASSWORD 'TuContraseña123';
# GRANT ALL PRIVILEGES ON DATABASE cloud_todo_db TO cloud_user;

# 4. Variables de entorno (opcional)
# set "DJANGO_SETTINGS_MODULE=config.settings"

# 5. Migraciones y superusuario
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # sigue el asistente

# 6. Arrancar servidor
#Asegurate de corrern en el entorno virtual!!!
python manage.py runserver  # http://localhost:8000
```

---

## Instalación frontend

> Carpeta `frontend/`

```powershell
cd Proyectos\frontend

# 1. Instalar dependencias
npm install

# 2. Variables de entorno ➜ .env
# VITE_API_URL=http://localhost:8000/api

# 3. Ejecutar en modo desarrollo
npm run dev   # http://localhost:5173

# 4. Compilar para producción
npm run build
```

Tailwind CSS v4 está configurado. Si usas otra versión revisa `postcss.config.js`.

---

## Comandos rápidos

| Acción        | Backend                           | Frontend                |
| ------------- | --------------------------------- | ----------------------- |
| Instalar deps | `pip install -r requirements.txt` | `npm i`                 |
| Migrar DB     | `python manage.py migrate`        | —                       |
| Servidor dev  | `python manage.py runserver`      | `npm run dev`           |
| Tests         | `pytest -q --cov=tasks`           | `npm run test` (Vitest) |

---

## Pruebas automatizadas

### Backend

```bash
pytest -q --cov=tasks
```

### Frontend

```bash
npm run test      # Vitest + Testing Library
```

Los tests cubren flujos de registro, login y CRUD de tareas.

---

## Variables de entorno

| Archivo           | Clave          | Ejemplo                     |
| ----------------- | -------------- | --------------------------- |
| **frontend/.env** | `VITE_API_URL` | `http://localhost:8000/api` |

Para personalizar JWT u otros parámetros edita `config/settings.py`.

---

## Endpoints principales

| Método                 | URL                   | Descripción                      |
| ---------------------- | --------------------- | -------------------------------- |
| `POST`                 | `/api/auth/register/` | Registro de usuario              |
| `POST`                 | `/api/auth/`          | Obtener `access` y `refresh` JWT |
| `POST`                 | `/api/auth/refresh/`  | Renovar token                    |
| `GET` `POST`           | `/api/tasks/`         | Listar / crear tareas            |
| `PUT` `PATCH` `DELETE` | `/api/tasks/{id}/`    | CRUD sobre tarea                 |

> Todos los endpoints `/api/tasks/*` requieren `Authorization: Bearer <access>`.

---

### Autor

**David Claudio** – [davidclaudio5000@gmail.com])

Licencia MIT © 2025.

# Pruebatecnica
