import BookCard from "../components/BookCard"
import DetailPanel from "../components/DetailPanel"
import { useState } from "react"
import { Link } from "react-router-dom"

/**
 * FavoritesPage.jsx — View 3: Saved / Favorited Books
 *
 * Displays the user's saved books in the same grid layout as SearchPage.
 * Since favorites are stored in App.jsx state, they persist while the
 * session is active (navigating between pages won't clear them).
 *
 * Props:
 *  - favorites (array): list of saved book objects
 *  - toggleFavorite (fn): removes a book when heart is clicked
 */
export default function FavoritesPage({ favorites, toggleFavorite }) {
  const [selected, setSelected] = useState(null)

  const isFavorited = (book) => favorites.some((b) => b.key === book.key)

  return (
    <div className="app-wrapper">
      <main className="main">
        {/* Page header */}
        <div className="results-header">
          <span className="results-label">
            <em>Your Saved Books</em>
          </span>
          <span className="results-count">{favorites.length} saved</span>
        </div>

        {/* Empty state with a call-to-action back to search */}
        {favorites.length === 0 && (
          <div className="state-container">
            <div className="empty-icon">♡</div>
            <p className="empty-text">No saved books yet</p>
            <p className="empty-sub">
              Click the heart icon on any book to save it here.
            </p>
            <Link to="/" className="load-more-btn" style={{ marginTop: "1rem", textDecoration: "none", display: "inline-block" }}>
              Browse books →
            </Link>
          </div>
        )}

        {/* Saved books grid */}
        {favorites.length > 0 && (
          <div className="book-grid">
            {favorites.map((book, i) => (
              <BookCard
                key={`${book.key || book.title}-${i}`}
                book={book}
                onClick={setSelected}
                onFavorite={toggleFavorite}
                isFavorited={isFavorited(book)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail modal (same component reused from SearchPage) */}
      {selected && (
        <DetailPanel
          book={selected}
          onClose={() => setSelected(null)}
          onFavorite={toggleFavorite}
          isFavorited={isFavorited(selected)}
        />
      )}
    </div>
  )
}