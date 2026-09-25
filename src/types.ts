export type TrainingCategory = 'skill' | 'strength'

export interface TrainingVideo {
  id: string
  title: string
  channel: string
  category: TrainingCategory
  /** YouTube video id used for the thumbnail and embedded player. */
  youtubeId: string
}

export interface Sport {
  id: string
  name: string
  tagline: string
  emoji: string
  /** Accent color used for the sport card gradient. */
  accent: string
  videos: TrainingVideo[]
}
