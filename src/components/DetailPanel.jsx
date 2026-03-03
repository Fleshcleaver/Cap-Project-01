import { useEffect } from "react"

/**
 * DetailPanel.jsx — Modal overlay for a single book's full details
 *
 * Props:
 *  - book (object | null): the selected book; null means closed
 *  - onClose (fn): called to close the panel
 *  - onFavorite (fn): called to toggle favorite status
 *  - isFavorited (bool): whether this book is currently saved
 *
 * Accessibility: pressing Escape closes the panel.
 * Clicking the dark backdrop also closes the panel.
 */

const COVER_BASE = "https://covers.openlibrary.org/b/id/"

export default function DetailPanel({ book, onClose, onFavorite, isFavorited }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!book) return null

  const authors = book.author_name ? book.author_name.join(", ") : "Unknown Author"
  const subjects = book.subject ? book.subject.slice(0, 8) : []
  const olUrl = book.key ? `https://openlibrary.org${book.key}` : null

  return (
    // Clicking the backdrop (not the panel itself) closes the modal
    <div
      className="detail-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="detail-panel" role="dialog" aria-modal="true" aria-label={book.title}>
        {/* Sticky close bar */}
        <div className="detail-close">
          <button
            className={"fav-btn fav-btn--lg" + (isFavorited ? " fav-btn--active" : "")}
            onClick={() => onFavorite(book)}
          >
            {isFavorited ? "♥ Saved" : "♡ Save"}
          </button>
          <button className="close-btn" onClick={onClose}>Close ✕</button>
        </div>

        <div className="detail-body">
          {/* Left column: cover image */}
          <div className="detail-cover-col">
            {book.cover_i ? (
              <img
                src={`${COVER_BASE}${book.cover_i}-L.jpg`}
                alt={book.title}
                className="detail-cover"
              />
            ) : (
              <div className="detail-cover-placeholder"><span>📖</span></div>
            )}
          </div>

          {/* Right column: metadata */}
          <div className="detail-info">
            <div>
              <div className="detail-eyebrow">Open Library Record</div>
              <h2 className="detail-title">{book.title}</h2>
              <p className="detail-author">by {authors}</p>
            </div>

            <hr className="detail-divider" />

            {/* Key stats grid */}
            <div className="detail-meta">
              {book.first_publish_year && (
                <MetaItem label="First Published" value={book.first_publish_year} />
              )}
              {book.edition_count && (
                <MetaItem label="Editions" value={book.edition_count} />
              )}
              {book.number_of_pages_median && (
                <MetaItem label="Avg. Pages" value={book.number_of_pages_median} />
              )}
              {book.language && (
                <MetaItem label="Languages" value={book.language.length} />
              )}
            </div>

            {/* Subject tags */}
            {subjects.length > 0 && (
              <div>
                <div className="meta-label" style={{ marginBottom: "0.5rem" }}>Subjects</div>
                <div className="detail-subjects">
                  {subjects.map((s, i) => (
                    <span key={i} className="subject-tag">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Link to Open Library */}
            {olUrl && (
              <a href={olUrl} target="_blank" rel="noopener noreferrer" className="detail-ol-link">
                View on Open Library →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Small helper component for a label + value metadata pair */
function MetaItem({ label, value }) {
  return (
    <div className="meta-item">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  )
}