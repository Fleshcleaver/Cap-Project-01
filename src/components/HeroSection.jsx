// HeroSection.jsx — Landing screen shown before any search is performed
//
// Purely presentational. Encourages the user to start searching.

const styles = {
  section: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 'clamp(3rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--gold)',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
    fontWeight: 900,
    lineHeight: 0.95,
    color: 'var(--ink)',
    letterSpacing: '-0.02em',
  },
  titleEm: {
    fontStyle: 'italic',
    color: 'var(--forest)',
  },
  desc: {
    fontSize: '1.2rem',
    fontWeight: 300,
    color: 'var(--ink-light)',
    maxWidth: 480,
    lineHeight: 1.6,
    marginTop: '0.5rem',
  },
  stats: {
    display: 'flex',
    gap: '2.5rem',
    marginTop: '1rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border)',
  },
  stat: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'var(--forest)',
  },
  statLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.58rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
  },
}

export default function HeroSection() {
  return (
    <section style={styles.section}>
      <p style={styles.eyebrow}>Powered by Open Library</p>
      <h1 style={styles.title}>
        Every book<br />
        <em style={styles.titleEm}>ever written.</em>
      </h1>
      <p style={styles.desc}>
        Search millions of titles from the Open Library catalogue.
        Discover authors, editions, subjects, and more.
      </p>
      <div style={styles.stats}>
        <div style={styles.stat}>
          <span style={styles.statNum}>40M+</span>
          <span style={styles.statLabel}>Editions</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statNum}>20M+</span>
          <span style={styles.statLabel}>Works</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statNum}>Free</span>
          <span style={styles.statLabel}>Always</span>
        </div>
      </div>
    </section>
  )
}
