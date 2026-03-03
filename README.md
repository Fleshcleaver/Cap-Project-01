# Folio — Book Search App

A React application that lets users search millions of books using the [Open Library API](https://openlibrary.org/developers/api). Built for Project 1 of the Full-Stack Web Development course.

## 🔍 What It Does

- Search any book by title, author, or subject via the Open Library public API
- Browse results in a responsive grid with cover art
- Click any book for a full detail view (editions, page count, subjects, languages)
- Save books to a personal Favorites list (persists during the session)
- Navigate between Search and Favorites via React Router

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Bundler | Vite |
| Routing | React Router v6 |
| API | [Open Library Search API](https://openlibrary.org/search.json) |
| Styling | Plain CSS with custom properties |
| Fonts | Playfair Display, Cormorant Garamond, DM Mono (Google Fonts) |

---

## 📁 Project Structure

```
folio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # App entry point, mounts BrowserRouter
    ├── App.jsx               # Root: route definitions + shared favorites state
    ├── styles/
    │   └── index.css         # Global styles & design tokens
    ├── hooks/
    │   └── useBookSearch.js  # Custom hook — all fetch/pagination logic
    ├── components/
    │   ├── Header.jsx        # Sticky nav bar with route links
    │   ├── BookCard.jsx      # Grid tile (cover, title, author, heart button)
    │   └── DetailPanel.jsx   # Modal overlay with full book metadata
    └── pages/
        ├── SearchPage.jsx    # View 1 (Hero) + View 2 (Results grid)
        └── FavoritesPage.jsx # View 3 — saved books
```

---

## 🚀 Running Locally

**Prerequisites:** Node.js 18+ and npm

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/folio-book-search.git
cd folio-book-search

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Building for Production

```bash
npm run build       # outputs to /dist
npm run preview     # locally preview the production build
```

---

## ☁️ Deploying to Netlify (Recommended — Free)

1. Push your project to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Connect your GitHub account and select this repository
4. Set the following build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

> **Important:** Because this app uses React Router's `BrowserRouter`, you need to add a `_redirects` file inside the `public/` folder so that Netlify routes all requests to `index.html`:
>
> ```
> /*    /index.html   200
> ```

### Deploying to Vercel (Alternative)

```bash
npm install -g vercel
vercel
```
Follow the prompts — Vercel auto-detects Vite projects. No extra config needed.

---

## 🔌 API Reference

This app uses the **Open Library Search API** — no API key required.

```
GET https://openlibrary.org/search.json?q=harry+potter&page=1&limit=24
```

Key response fields used:

| Field | Description |
|---|---|
| `docs[].title` | Book title |
| `docs[].author_name` | Array of author names |
| `docs[].cover_i` | Cover image ID (used with covers.openlibrary.org) |
| `docs[].first_publish_year` | Year of first publication |
| `docs[].edition_count` | Number of editions |
| `docs[].subject` | Array of subject tags |
| `docs[].number_of_pages_median` | Median page count across editions |
| `numFound` | Total matching results (used for pagination) |

Cover images are fetched from:
```
https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
```

---

## ✅ Assignment Checklist

- [x] Dynamic fetch to external API (Open Library `search.json`)
- [x] State management: loading, error, display logic (`useBookSearch` custom hook)
- [x] At least 3 views/components: `Header`, `BookCard`, `DetailPanel`, `SearchPage`, `FavoritesPage`
- [x] Client-side routing with React Router v6
- [x] Meaningful styling and layout (CSS custom properties, responsive grid)
- [x] Clean GitHub commit history