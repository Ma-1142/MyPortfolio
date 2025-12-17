# eMuseum Project Overview

A **digital photography gallery/museum platform** for browsing, viewing, and purchasing artwork.

---

## ⚠️ AI ASSISTANT - READ THIS FIRST ⚠️

**STOP. Read ALL mdREAD/*.md files completely before taking ANY action.**

1. Read `PROJECT_INFO.md` (this file) - project overview and startup commands
2. Read `FIGMA_IMPLEMENTATION.md` - implementation guide for the frontend

**Do NOT skip this step. Do NOT skim. The instructions below will save time.**

---

## Quick Start

> **AI Assistant Note:** When reading this file, ask the user if they want to start the frontend and backend servers, and if they want to open the Django admin page (http://127.0.0.1:8000/admin/).
>
> **IMPORTANT:** When the user asks you to make a change, do NOT start making changes until the user explicitly tells you to proceed. Always explain the plan first and wait for confirmation.

### Starting the Servers

**USE THIS EXACT FORMAT - NO EXCEPTIONS:**

```bash
# Backend (run with run_in_background: true)
python C:/Users/masam/prodivant_project/eMuseum/backend/manage.py runserver

# Frontend (run with run_in_background: true)
npm start --prefix C:/Users/masam/prodivant_project/eMuseum/frontend

# Open admin page
start http://127.0.0.1:8000/admin/

# Open frontend
start http://localhost:3000
```

### ❌ DO NOT USE:
- `cmd.exe /c` - doesn't work in this environment
- Backslash paths (`C:\Users\...`) - use forward slashes (`C:/Users/...`)
- Batch files through `start` command - unreliable

### ✅ DO USE:
- Forward-slash paths: `C:/Users/masam/prodivant_project/eMuseum/...`
- `run_in_background: true` parameter for servers
- `TaskOutput` to verify servers started correctly

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

## TODO - Next Session

- [ ] **Smooth Scrolling/Immersive Mode**: The scroll-driven immersive mode exists but transitions aren't smooth enough. Need to improve:
  - Smoother fade/slide animations for navbar, sidebar as user scrolls
  - Consider using requestAnimationFrame with lerp for butter-smooth progress updates
  - Current CSS transitions (0.4s ease-out) added but not producing desired smoothness
  - May need to debounce/throttle scroll events or use a different approach entirely

- [x] **Info Overlay on Photos**: ~~Move photo info (title, artist, description, price/availability) to overlay on the photo itself~~ - DONE
  - Alternates left/right sides based on row index
  - Positioned at vertical center of photo
  - No borders, semi-transparent dark background with blur

---

*Last updated: December 2025*
