import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import SearchPage from "./pages/SearchPage"
import FavoritesPage from "./pages/FavoritesPage"
import { useState } from "react"

/**
 * App.jsx — Root component
 *
 * Responsibilities:
 *  - Owns the `favorites` state so it can be shared between
 *    SearchPage (add/remove) and FavoritesPage (display).
 *  - Defines the two client-side routes using React Router v6.
 *  - Renders the persistent Header on every page.
 */
export default function App() {
  // favorites is an array of book objects saved by the user.
  // Kept here (lifted state) so both pages can read and update it.
  const [favorites, setFavorites] = useState([])

  /** Toggle a book in/out of the favorites list by its OL key. */
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((b) => b.key === book.key)
      return exists ? prev.filter((b) => b.key !== book.key) : [...prev, book]
    })
  }

  const isFavorited = (book) => favorites.some((b) => b.key === book.key)

  return (
    <>
      <Header favCount={favorites.length} />
      <Routes>
        {/* View 1 & 2: Search results + book detail modal */}
        <Route
          path="/"
          element={
            <SearchPage
              toggleFavorite={toggleFavorite}
              isFavorited={isFavorited}
            />
          }
        />
        {/* View 3: Saved favorites */}
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </>
  )
}