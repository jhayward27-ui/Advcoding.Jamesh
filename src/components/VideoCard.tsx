import type { TrainingVideo } from '../types'

interface VideoCardProps {
  video: TrainingVideo
  onPlay: (video: TrainingVideo) => void
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <button
      type="button"
      className="video-card"
      onClick={() => onPlay(video)}
      aria-label={`Play ${video.title}`}
    >
      <span className="video-card__thumb">
        <img src={thumbnail} alt="" loading="lazy" />
        <span className="video-card__play" aria-hidden="true">
          ▶
        </span>
        <span className="video-card__duration">{video.duration}</span>
      </span>
      <span className="video-card__body">
        <span className="video-card__title">{video.title}</span>
        <span className="video-card__channel">{video.channel}</span>
      </span>
    </button>
  )
}
