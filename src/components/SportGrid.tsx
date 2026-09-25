import type { Sport } from '../types'

interface SportGridProps {
  sports: Sport[]
  onSelect: (sport: Sport) => void
}

export function SportGrid({ sports, onSelect }: SportGridProps) {
  return (
    <section className="sport-grid" aria-label="Choose a sport">
      {sports.map((sport) => (
        <button
          key={sport.id}
          type="button"
          className="sport-card"
          style={{ ['--accent' as string]: sport.accent }}
          onClick={() => onSelect(sport)}
        >
          <span className="sport-card__emoji" aria-hidden="true">
            {sport.emoji}
          </span>
          <span className="sport-card__name">{sport.name}</span>
          <span className="sport-card__tagline">{sport.tagline}</span>
          <span className="sport-card__count">{sport.videos.length} training videos</span>
        </button>
      ))}
    </section>
  )
}
