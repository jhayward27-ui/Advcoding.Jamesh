import { useMemo, useState } from 'react'
import { sports } from './data/sports'
import type { Sport, TrainingVideo } from './types'
import { SportGrid } from './components/SportGrid'
import { TrainingView } from './components/TrainingView'
import { VideoModal } from './components/VideoModal'

export default function App() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null)
  const [activeVideo, setActiveVideo] = useState<TrainingVideo | null>(null)
  const [query, setQuery] = useState('')

  const filteredSports = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sports
    return sports.filter(
      (s) => s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="app">
      <header className="app__hero">
        <div className="app__brand" onClick={() => setSelectedSport(null)} role="banner">
          <span className="app__logo" aria-hidden="true">
            🔺
          </span>
          <span>Elevate</span>
        </div>
        <h1>Train for any sport</h1>
        <p className="app__subtitle">
          Pick your sport and get a focused set of skill drills and weight-room
          workouts to actually get better.
        </p>
        {!selectedSport && (
          <input
            className="app__search"
            type="search"
            placeholder="Search sports…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search sports"
          />
        )}
      </header>

      <main className="app__main">
        {selectedSport ? (
          <TrainingView
            sport={selectedSport}
            onBack={() => setSelectedSport(null)}
            onPlay={setActiveVideo}
          />
        ) : filteredSports.length > 0 ? (
          <SportGrid sports={filteredSports} onSelect={setSelectedSport} />
        ) : (
          <p className="app__empty">No sports match “{query}”. Try another search.</p>
        )}
      </main>

      <footer className="app__footer">
        <span>Elevate · Advcoding.Jamesh</span>
        <span>Get better, one session at a time.</span>
      </footer>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  )
}
