// NotFoundPage.jsx — Route: "*" (any unmatched path)
// Simple 404 screen with a link back to the home page.

import { Link } from 'react-router-dom'

const styles = {
  page: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '1.5rem', minHeight: '60vh', textAlign: 'center',
    padding: '2rem',
  },
  code: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.65rem', letterSpacing: '0.2em',
    textTransform: 'uppercase', color: 'var(--gold)',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900, fontStyle: 'italic', color: 'var(--ink)',
  },
  sub: {
    fontSize: '1.1rem', fontWeight: 300,
    color: 'var(--muted)', maxWidth: 360,
  },
  link: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.65rem', letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--cream)', background: 'var(--forest)',
    padding: '0.7rem 1.4rem', textDecoration: 'none',
    marginTop: '0.5rem', display: 'inline-block',
  },
}

export default function NotFoundPage() {
  return (
    <div style={styles.page}>
      <p style={styles.code}>404</p>
      <h1 style={styles.heading}>Page not found</h1>
      <p style={styles.sub}>This shelf is empty. Head back and find a book worth reading.</p>
      <Link to="/" style={styles.link}>← Back to Folio</Link>
    </div>
  )
}
