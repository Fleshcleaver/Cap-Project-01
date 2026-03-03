import { useState } from "react"
import { useBookSearch } from "../hooks/useBookSearch"
import BookCard from "../components/BookCard"
import DetailPanel from "../components/DetailPanel"

/**
 * SearchPage.jsx — View 1 (Hero) + View 2 (Search Results)
 *
 * This page handles two visual states:
 *  1. Hero — shown before any search is submitted
 *  2. Results grid — shown after a search, with optional detail modal
 *
 * Props:
 *  - toggleFavorite (fn): passed down to cards and detail panel
 *  - isFavorited (fn): passed down to cards and detail panel
 */
export default function SearchPage({ toggleFavorite, isFavorited }) {
  // Local UI state for the search input and selected book modal
  const [inputVal, setInputVal] = useState("")
  const [selected, setSelected] = useState(null)

  // All fetch/data logic lives in this custom hook
  const {
    books, total, loading, error,
    hasSearched, currentQuery,
    search, loadMore, hasMore
  } = useBookSearch()

  const handleSubmit = (e) => {
    e.preventDefault()
    search(inputVal.trim())
  }

  return (
    <div className="app-wrapper">
      {/* ── Hero Section (hidden once user has searched) ── */}
      {!hasSearched && (
        <section className="hero">
          <p className="hero-eyebrow">Powered by Open Library</p>
          <h1 className="hero-title">
            Every book<br />
            <em>ever written.</em>
          </h1>
          <p className="hero-desc">
            Search millions of titles from the Open Library catalogue.
            Discover authors, editions, subjects, and more.
          </p>

          {/* Large centered search form on the hero */}
          <form className="hero-search-form" onSubmit={handleSubmit}>
            <input
              className="search-input search-input--hero"
              type="text"
              placeholder="Search by title, author, or subject…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
            />
            <button className="search-btn search-btn--hero" type="submit">
              Search
            </button>
          </form>
        </section>
      )}

      {/* ── Results Section ── */}
      {hasSearched && (
        <main className="main">
          {/* Inline search bar shown once results are visible */}
          <form className="inline-search-form" onSubmit={handleSubmit}>
            <input
              className="search-input"
              type="text"
              placeholder="Search books…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button className="search-btn" type="submit">Search</button>
          </form>

          {/* Error banner */}
          {error && <div className="error-banner">{error}</div>}

          {/* Results header with count */}
          {!loading && books.length > 0 && (
            <div className="results-header">
              <span className="results-label">Results for "{currentQuery}"</span>
              <span className="results-count">{total.toLocaleString()} works found</span>
            </div>
          )}

          {/* Loading spinner (first page only) */}
          {loading && books.length === 0 && (
            <div className="state-container">
              <p className="loading-text">Searching the stacks…</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && books.length === 0 && (
            <div className="state-container">
              <div className="empty-icon">📚</div>
              <p className="empty-text">No results for "{currentQuery}"</p>
              <p className="empty-sub">Try a different title, author, or subject.</p>
            </div>
          )}

          {/* Book grid */}
          {books.length > 0 && (
            <>
              <div className="book-grid">
                {books.map((book, i) => (
                  <BookCard
                    key={`${book.key || book.title}-${i}`}
                    book={book}
                    onClick={setSelected}
                    onFavorite={toggleFavorite}
                    isFavorited={isFavorited(book)}
                  />
                ))}
              </div>

              {/* Load more / loading spinner */}
              <div className="load-more-wrap">
                {loading && <p className="loading-text">Loading more…</p>}
                {hasMore && !loading && (
                  <button className="load-more-btn" onClick={loadMore}>
                    Load more books
                  </button>
                )}
              </div>
            </>
          )}
        </main>
      )}

      {/* ── Detail Modal (View 2b) ── */}
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