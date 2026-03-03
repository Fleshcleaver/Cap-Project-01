// BookDetailPage.jsx — Route: "/book/:id"
//
// Displays full metadata for a single book.
// Book data arrives via React Router location.state (set by BookCard on click).
// If the user navigates here directly (no state), we show a friendly fallback.
//
// Metadata shown: cover, title, authors, publish year, editions,
// pages, languages, and subject tags.

import { useLocation, useNavigate } from 'react-router-dom'

const COVER_BASE = 'https://covers.openlibrary.org/b/id/'

const styles = {
  page: {
    maxWidth: 900,
    margin: '0 auto',
    padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
  },
  backBtn: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    background: 'none',
    border: '1px solid var(--border)',
    padding: '0.45rem 0.9rem',
    cursor: 'pointer',
    marginBottom: '2.5rem',
    display: 'inline-block',
    transition: 'all 0.15s',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'clamp(160px, 22%, 240px) 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  cover: {
    width: '100%',
    aspectRatio: '2/3',
    objectFit: 'cover',
    border: '1px solid var(--border)',
    boxShadow: '4px 6px 24px rgba(26,21,16,0.15)',
    display: 'block',
  },
  coverPlaceholder: {
    width: '100%', aspectRatio: '2/3',
    background: 'linear-gradient(135deg, var(--parchment), #e0d9cb)',
    border: '1px solid var(--border)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '4rem',
  },
  info: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.6rem', letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--gold)',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
    fontWeight: 900, lineHeight: 1.1,
    color: 'var(--ink)', letterSpacing: '-0.01em',
  },
  author: {
    fontSize: '1.2rem', fontStyle: 'italic',
    fontWeight: 300, color: 'var(--ink-light)',
  },
  divider: { border: 'none', borderTop: '1px solid var(--border)' },
  meta: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: '1.2rem',
  },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  metaLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.58rem', letterSpacing: '0.15em',
    textTransform: 'uppercase', color: 'var(--muted)',
  },
  metaValue: { fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' },
  subjectsWrap: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  tag: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.82rem', fontStyle: 'italic',
    color: 'var(--forest)',
    background: 'rgba(45,74,53,0.08)',
    border: '1px solid rgba(45,74,53,0.2)',
    padding: '0.25rem 0.65rem', borderRadius: 2,
  },
  olLink: {
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--cream)', background: 'var(--forest)',
    border: 'none', padding: '0.7rem 1.4rem',
    textDecoration: 'none', cursor: 'pointer',
    transition: 'background 0.2s', width: 'fit-content',
  },
  fallback: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '1rem', padding: '5rem 2rem', textAlign: 'center',
  },
  fallbackText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--muted)',
  },
}

function MetaItem({ label, value }) {
  if (!value) return null
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaLabel}>{label}</span>
      <span style={styles.metaValue}>{value}</span>
    </div>
  )
}

export default function BookDetailPage() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const book      = state?.book

  // Graceful fallback if user navigates here directly without state
  if (!book) {
    return (
      <div style={styles.fallback}>
        <p style={styles.fallbackText}>No book data found.</p>
        <button style={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to search
        </button>
      </div>
    )
  }

  const authors  = book.author_name ? book.author_name.join(', ') : 'Unknown Author'
  const subjects = book.subject ? book.subject.slice(0, 10) : []
  const olUrl    = book.key ? `https://openlibrary.org${book.key}` : null

  return (
    <div style={styles.page}>
      {/* Back navigation */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div style={styles.layout}>
        {/* Cover image */}
        <div>
          {book.cover_i ? (
            <img
              src={`${COVER_BASE}${book.cover_i}-L.jpg`}
              alt={book.title}
              style={styles.cover}
              onError={e => { e.target.style.display = 'none' }}
            />
          ) : (
            <div style={styles.coverPlaceholder}>📖</div>
          )}
        </div>

        {/* Book info */}
        <div style={styles.info}>
          <div>
            <p style={styles.eyebrow}>Open Library Record</p>
            <h1 style={styles.title}>{book.title}</h1>
            <p style={styles.author}>by {authors}</p>
          </div>

          <hr style={styles.divider} />

          {/* Key metadata */}
          <div style={styles.meta}>
            <MetaItem label="First Published"  value={book.first_publish_year} />
            <MetaItem label="Editions"         value={book.edition_count} />
            <MetaItem label="Avg. Pages"       value={book.number_of_pages_median} />
            <MetaItem label="Languages"        value={book.language?.length} />
          </div>

          {/* Subject tags */}
          {subjects.length > 0 && (
            <div>
              <p style={{ ...styles.metaLabel, marginBottom: '0.5rem' }}>Subjects</p>
              <div style={styles.subjectsWrap}>
                {subjects.map((s, i) => (
                  <span key={i} style={styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* External link to Open Library */}
          {olUrl && (
            <a href={olUrl} target="_blank" rel="noopener noreferrer" style={styles.olLink}>
              View on Open Library →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
