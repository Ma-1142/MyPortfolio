# eMuseum Project Overview

A **digital photography gallery/museum platform** for browsing, viewing, and purchasing artwork.

---

## Quick Start

> **AI Assistant Note:** When reading this file, ask the user if they want to start the frontend and backend servers, and if they want to open the Django admin page (http://127.0.0.1:8000/admin/).
>
> **IMPORTANT:** When the user asks you to make a change, do NOT start making changes until the user explicitly tells you to proceed. Always explain the plan first and wait for confirmation.

```bash
# Start both servers (run each in background):
cd backend && python manage.py runserver   # Backend: http://127.0.0.1:8000
cd frontend && npm start                    # Frontend: http://localhost:3000

# Open admin page:
start http://127.0.0.1:8000/admin/
```

> **AI Startup Note:** Run commands directly in bash without `cmd.exe` wrapper. Use `run_in_background: true` for both servers. Do NOT use `cmd.exe /c` - it doesn't work properly in this environment.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Create React App, CSS |
| **Backend** | Django 4.2, Django REST Framework |
| **Database** | MySQL |
| **Image Processing** | Pillow |

---

## Frontend (`/frontend/`)

- **Framework:** React 19.2.0 with Create React App
- **Testing:** @testing-library/react, Jest
- **Styling:** Vanilla CSS with responsive design
- **API Communication:** Fetch API

### Frontend Scripts
```bash
npm start       # Run development server
npm build       # Production build
npm test        # Run tests
```

---

## Backend (`/backend/`)

- **Framework:** Django 4.2, Django REST Framework 3.14
- **CORS:** django-cors-headers
- **Environment:** python-dotenv
- **Image Handling:** Pillow

### Backend Commands
```bash
python manage.py runserver      # Run dev server
python manage.py migrate        # Apply migrations
python manage.py makemigrations # Create migrations
python manage.py createsuperuser # Create admin user
```

---

## Database Models

### Category
- `name` - CharField
- `description` - TextField
- `created_at` - DateTimeField

### Picture
- `title` - CharField
- `description` - TextField
- `image` - ImageField (stored in `/media/pictures/`)
- `price` - DecimalField
- `category` - ForeignKey to Category
- `artist` - CharField
- `is_available` - BooleanField
- `created_at`, `updated_at` - DateTimeField

### Order
- `user` - ForeignKey to User
- `picture` - ForeignKey to Picture
- `status` - CharField (pending, confirmed, shipped, delivered, cancelled)
- `total_price` - DecimalField
- `shipping_address` - TextField
- `created_at`, `updated_at` - DateTimeField

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET/POST /api/categories/` | List/Create categories |
| `GET/PUT/DELETE /api/categories/{id}/` | Category CRUD |
| `GET/POST /api/pictures/` | List/Create pictures |
| `GET/PUT/DELETE /api/pictures/{id}/` | Picture CRUD |
| `GET /api/pictures/?category={id}` | Filter by category |
| `/admin/` | Django admin panel |

---

## Architecture

```
React Frontend (Port 3000)
        ↓ (HTTP/Fetch)
Django REST API (Port 8000)
        ↓
MySQL Database (Port 3306)
        ↓
File System (/media/pictures/)
```

---

## Development Setup

### Ports
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://127.0.0.1:8000`
- **Database:** `localhost:3306`

### Environment Variables (`.env`)
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=
```

> **⚠️ Security Note:** The `.env` file contains sensitive credentials (database password, Django secret key). Ensure this file is listed in `.gitignore` and never committed to version control.

---

*Last updated: December 2025*
