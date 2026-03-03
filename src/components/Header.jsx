import { Link, useNavigate } from "react-router-dom"

/**
 * Header.jsx — Persistent top navigation bar
 *
 * Props:
 *  - favCount (number): badge count shown on the Favorites link
 *
 * Uses React Router's <Link> for client-side navigation
 * (no full page reload) and useNavigate for the logo click.
 */
export default function Header({ favCount }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo — navigates home */}
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-title">Folio</span>
          <span className="logo-sub">Book Search</span>
        </div>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/favorites" className="nav-link nav-link--fav">
            Saved
            {/* Only show badge if there are favorites */}
            {favCount > 0 && (
              <span className="fav-badge">{favCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}