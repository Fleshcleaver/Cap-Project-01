/**
 * BookCard.jsx — Single book tile displayed in the grid
 *
 * Props:
 *  - book (object): raw doc object from the Open Library API
 *  - onClick (fn): called when the card is clicked (opens detail panel)
 *  - onFavorite (fn): called when the heart button is clicked
 *  - isFavorited (bool): whether this book is saved
 *
 * Renders the cover image (with fallback), title, author, and year.
 */

const COVER_BASE = "https://covers.openlibrary.org/b/id/"

export default function BookCard({ book, onClick, onFavorite, isFavorited }) {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
      <div className="book-cover-wrap">
        <BookCover coverId={book.cover_i} title={book.title} />

        {/* Favorite button — stopPropagation prevents the modal from opening */}
        <button
          className={"fav-btn" + (isFavorited ? " fav-btn--active" : "")}
          onClick={(e) => { e.stopPropagation(); onFavorite(book) }}
          title={isFavorited ? "Remove from saved" : "Save book"}
          aria-label={isFavorited ? "Remove from saved" : "Save book"}
        >
          {isFavorited ? "♥" : "♡"}
        </button>

        {/* Year badge */}
        {book.first_publish_year && (
          <span className="book-year-badge">{book.first_publish_year}</span>
        )}
      </div>

      <div className="book-info">
        <div className="book-title-text">{book.title}</div>
        <div className="book-author-text">
          {book.author_name ? book.author_name[0] : "Unknown Author"}
        </div>
      </div>
    </div>
  )
}

/**
 * BookCover — internal sub-component
 * Renders the cover image, or a styled placeholder on error / missing id.
 */
function BookCover({ coverId, title }) {
  if (!coverId) return <PlaceholderCover title={title} />

  return (
    <img
      src={`${COVER_BASE}${coverId}-M.jpg`}
      alt={title}
      className="book-cover-img"
      // If the image fails to load, swap in the placeholder
      onError={(e) => {
        e.target.style.display = "none"
        e.target.nextSibling && (e.target.nextSibling.style.display = "flex")
      }}
    />
  )
}

function PlaceholderCover({ title }) {
  return (
    <div className="book-cover-placeholder">
      <div className="placeholder-spine" />
      <p className="placeholder-title">{title}</p>
    </div>
  )
}