import type { Sport, TrainingVideo } from '../types'
import { VideoCard } from './VideoCard'

interface TrainingViewProps {
  sport: Sport
  onBack: () => void
  onPlay: (video: TrainingVideo) => void
}

export function TrainingView({ sport, onBack, onPlay }: TrainingViewProps) {
  const skill = sport.videos.filter((v) => v.category === 'skill')
  const strength = sport.videos.filter((v) => v.category === 'strength')

  return (
    <section className="training" style={{ ['--accent' as string]: sport.accent }}>
      <button type="button" className="training__back" onClick={onBack}>
        ← All sports
      </button>

      <header className="training__header">
        <span className="training__emoji" aria-hidden="true">
          {sport.emoji}
        </span>
        <div>
          <h2>{sport.name}</h2>
          <p>{sport.tagline}</p>
        </div>
      </header>

      <TrainingSection
        title="On-field skill training"
        subtitle="Sharpen technique and game skills"
        videos={skill}
        onPlay={onPlay}
      />
      <TrainingSection
        title="Weight room"
        subtitle="Build the strength and power behind the skill"
        videos={strength}
        onPlay={onPlay}
      />
    </section>
  )
}

interface TrainingSectionProps {
  title: string
  subtitle: string
  videos: TrainingVideo[]
  onPlay: (video: TrainingVideo) => void
}

function TrainingSection({ title, subtitle, videos, onPlay }: TrainingSectionProps) {
  if (videos.length === 0) return null
  return (
    <div className="training__section">
      <div className="training__section-head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={onPlay} />
        ))}
      </div>
    </div>
  )
}
