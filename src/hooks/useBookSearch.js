import { useState, useCallback, useRef } from "react"

const SEARCH_URL = "https://openlibrary.org/search.json"
const PAGE_SIZE = 24

/**
 * useBookSearch — custom hook that encapsulates all search logic
 *
 * Separating data-fetching logic into a custom hook keeps pages clean
 * and makes the fetch logic easy to test or reuse.
 *
 * Returns:
 *  - books: array of result objects from the API
 *  - total: total number of matches (from API numFound)
 *  - loading: boolean — true while a request is in flight
 *  - error: string | "" — error message if the request failed
 *  - hasSearched: boolean — true after the first search fires
 *  - currentQuery: the last submitted query string
 *  - search(query): start a new search (resets page to 1)
 *  - loadMore(): fetch the next page and append to books
 */
export function useBookSearch() {
  const [books, setBooks] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [page, setPage] = useState(1)

  // AbortController ref lets us cancel in-flight requests when a new
  // search starts, preventing stale results from appearing.
  const abortRef = useRef(null)

  const fetchBooks = useCallback(async (q, pg, append = false) => {
    // Cancel any pending request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams({ q, page: pg, limit: PAGE_SIZE })
      const res = await fetch(`${SEARCH_URL}?${params}`, {
        signal: abortRef.current.signal,
      })

      if (!res.ok) throw new Error(`HTTP error ${res.status}`)

      const data = await res.json()
      setTotal(data.numFound || 0)

      // If appending (load more), concat results; otherwise replace
      setBooks((prev) =>
        append ? [...prev, ...(data.docs || [])] : (data.docs || [])
      )
      setHasSearched(true)
    } catch (e) {
      // AbortError is expected on cancel — don't show it as an error
      if (e.name !== "AbortError") {
        setError("Could not fetch results. Please check your connection and try again.")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  /** Start a fresh search from page 1 */
  const search = useCallback((q) => {
    if (!q.trim()) return
    setCurrentQuery(q)
    setPage(1)
    setBooks([])
    fetchBooks(q, 1, false)
  }, [fetchBooks])

  /** Append the next page of results */
  const loadMore = useCallback(() => {
    const next = page + 1
    setPage(next)
    fetchBooks(currentQuery, next, true)
  }, [page, currentQuery, fetchBooks])

  const hasMore = books.length < total && !loading

  return { books, total, loading, error, hasSearched, currentQuery, search, loadMore, hasMore }
}