// BookGrid.jsx — Responsive grid of BookCard components
//
// Also handles: empty state, loading skeleton, error banner,
// and the "Load more" pagination trigger.

import BookCard from './BookCard'

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '2rem 1.5rem',
  },
  stateBox: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '1rem', padding: '5rem 2rem', textAlign: 'center',
  },
  loadingText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--muted)',
    animation: 'pulse 1.4s ease-in-out infinite',
  },
  emptyIcon: { fontSize: '3.5rem', filter: 'grayscale(1)', opacity: 0.3 },
  emptyText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--muted)',
  },
  emptySub: { fontSize: '0.95rem', fontWeight: 300, color: 'var(--muted)' },
  errorBanner: {
    background: '#fdf0ed', border: '1px solid #e8c4bc',
    borderLeft: '3px solid #c0392b',
    padding: '1rem 1.5rem', marginBottom: '2rem',
    fontSize: '0.95rem', color: '#7a2d26',
  },
  loadWrap: {
    display: 'flex', justifyContent: 'center',
    padding: '3rem 0 1rem',
  },
  loadBtn: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1rem', fontStyle: 'italic',
    color: 'var(--forest)', background: 'none',
    border: '1px solid var(--forest)',
    padding: '0.7rem 2.5rem', cursor: 'pointer',
    letterSpacing: '0.03em', transition: 'all 0.2s',
  },
}

// CSS keyframe injected once
const pulseCSS = `
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }
`

export default function BookGrid({ books, loading, error, hasMore, onLoadMore, query }) {
  return (
    <>
      <style>{pulseCSS}</style>

      {/* Error message */}
      {error && <div style={styles.errorBanner}>{error}</div>}

      {/* Initial loading state — no results yet */}
      {loading && books.length === 0 && (
        <div style={styles.stateBox}>
          <p style={styles.loadingText}>Searching the stacks…</p>
        </div>
      )}

      {/* Empty state — search returned nothing */}
      {!loading && books.length === 0 && query && (
        <div style={styles.stateBox}>
          <div style={styles.emptyIcon}>📚</div>
          <p style={styles.emptyText}>No books found for "{query}"</p>
          <p style={styles.emptySub}>Try a different title, author, or subject.</p>
        </div>
      )}

      {/* Results grid */}
      {books.length > 0 && (
        <>
          <div style={styles.grid}>
            {books.map((book, i) => (
              <BookCard key={`${book.key || book.title}-${i}`} book={book} />
            ))}
          </div>

          {/* Pagination */}
          <div style={styles.loadWrap}>
            {loading ? (
              <p style={styles.loadingText}>Loading more…</p>
            ) : hasMore ? (
              <button style={styles.loadBtn} onClick={onLoadMore}>
                Load more books
              </button>
            ) : null}
          </div>
        </>
      )}
    </>
  )
}
