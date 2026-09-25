import { useEffect } from 'react'
import type { TrainingVideo } from '../types'

interface VideoModalProps {
  video: TrainingVideo
  onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={video.title} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div>
            <h3>{video.title}</h3>
            <p>{video.channel}</p>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close player">
            ✕
          </button>
        </div>
        <div className="modal__video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
