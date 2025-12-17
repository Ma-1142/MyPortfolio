# Figma Template Implementation Guide

## Overview
Implementing the portfolio template from `/figma/` designs. Desktop-only layout.

---

## Branding
- **Name:** `YOUR NAME` (placeholder - replace throughout)
- **Theme:** Dark (`#0a0a0a` background)
- **Accent:** Purple/blue gradient buttons

---

## File Structure (to create)

```
frontend/src/
├── components/
│   ├── Navbar.js
│   ├── Navbar.css
│   ├── Footer.js
│   ├── Footer.css
│   ├── Testimonials.js
│   ├── Testimonials.css
│   ├── FAQ.js
│   └── FAQ.css
├── pages/
│   ├── Home.js
│   ├── Home.css
│   ├── About.js
│   ├── About.css
│   ├── Portfolio.js
│   ├── Portfolio.css
│   ├── Services.js
│   ├── Services.css
│   ├── Contact.js
│   └── Contact.css
├── App.js (update with routes)
├── App.css (global dark theme)
└── index.css (reset/base styles)
```

---

## Implementation Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install react-router-dom
```

### Step 2: Setup Routing (App.js)
- Import `BrowserRouter`, `Routes`, `Route`
- Define routes: `/`, `/about`, `/portfolio`, `/services`, `/contact`

### Step 3: Build Shared Components

#### Navbar
- Logo: "YOUR NAME" (left)
- Links: Home, About Me, Portfolio, Services (center)
- Button: "Contact Me" (right, purple accent)

#### Footer
- CTA section: "LET'S WORK TOGETHER" with button
- Links grid: Home, Clients, Services columns
- Bottom: Copyright, social icons

#### Testimonials (carousel)
- Client photo, name, rating (stars)
- Review text
- Navigation arrows
- Used on: Home, About, Portfolio, Contact

#### FAQ (accordion)
- Expandable question/answer sections
- Used on: Home, Portfolio, Services

### Step 4: Build Pages

#### Home Page (`/`)
Sections:
1. Hero - Name, tagline, photo grid (4 images)
2. "I AM [NAME]" - Bio with photo, contact info
3. "MY PHOTOGRAPHY SERVICES" - Service cards (Events, Portraits, etc.)
4. "EXPLORE MY PHOTOGRAPHY WORK" - Portfolio preview grid
5. FAQ accordion
6. Testimonials carousel

#### About Page (`/about`)
Sections:
1. Hero - "ABOUT [NAME]" with stats bar (15+, 500+, 10+, etc.)
2. Photo with expand button
3. "MY BIOGRAPHY" - Text content
4. "JOURNEY - A TIMELINE" - Year cards (2005-2020)
5. Testimonials carousel

#### Portfolio Page (`/portfolio`)
Sections:
1. Hero - "VISUAL POETRY IN PIXELS"
2. Category sections:
   - PORTRAITS PHOTOGRAPHY (grid)
   - EVENTS PHOTOGRAPHY (grid)
   - COMMERCIAL PHOTOGRAPHY (grid)
3. FAQ accordion
4. Testimonials carousel

**Note:** Connect to existing API endpoints:
- `GET /api/categories/`
- `GET /api/pictures/?category={id}`

#### Services Page (`/services`)
Sections:
1. Hero - "DIVERSE PHOTOGRAPHY OFFERINGS"
2. Service tiers with pricing:
   - Portrait: $250, $400, $300
   - Events: $1,500, $800, Custom
   - Commercial: $500, $700, Custom
3. FAQ accordion

#### Contact Page (`/contact`)
Sections:
1. Hero - "GET IN TOUCH WITH ME" with image
2. Contact info (phone, email)
3. Contact form (name, email, phone, message)
4. "SEND MESSAGE" button
5. Testimonials carousel

### Step 5: Styling

#### Global Theme (App.css)
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #888888;
  --accent: #6366f1;
  --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
}
```

#### Typography
- Headings: Bold, uppercase for section titles
- Body: Light gray on dark background

---

## API Integration (Portfolio Page)

Existing endpoints to use:
```
GET /api/categories/        → List all categories
GET /api/pictures/          → List all pictures
GET /api/pictures/?category=1  → Filter by category
```

Picture object includes: `title`, `description`, `image`, `price`, `artist`, `status`

---

## Assets Needed
- Placeholder images for hero sections
- Profile photo placeholder
- Client testimonial photos (can use placeholders)

Images in `/mediaTMP/` can be used as portfolio samples.

---

## Order of Implementation

1. [ ] Install react-router-dom
2. [ ] Create folder structure (components/, pages/)
3. [ ] Setup App.js with routing
4. [ ] Build Navbar component
5. [ ] Build Footer component
6. [ ] Build Home page (largest, establishes patterns)
7. [ ] Build About page
8. [ ] Build Portfolio page (connect API)
9. [ ] Build Services page
10. [ ] Build Contact page
11. [ ] Build Testimonials component
12. [ ] Build FAQ component
13. [ ] Final styling pass

---

*Last updated: December 2025*
