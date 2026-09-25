import type { Sport } from '../types'

/**
 * Curated starter catalog. Each sport pairs on-field skill work with a
 * weight-room block so athletes can train the full picture.
 *
 * Every `youtubeId` points to a real, embeddable YouTube training video; the
 * title/channel labels were verified against each video's public metadata.
 */
export const sports: Sport[] = [
  {
    id: 'basketball',
    name: 'Basketball',
    tagline: 'Handles, shooting form, and explosive lower-body power.',
    emoji: '🏀',
    accent: '#f97316',
    videos: [
      {
        id: 'bball-1',
        title: 'The Ultimate 5-Minute Dribbling Workout',
        channel: 'ILoveBasketballTV',
        category: 'skill',
        youtubeId: 'P7NBo3yKkm4',
      },
      {
        id: 'bball-2',
        title: 'Find YOUR Perfect Shooting Form',
        channel: 'ShotMechanics',
        category: 'skill',
        youtubeId: 'x7anDE7OEww',
      },
      {
        id: 'bball-3',
        title: 'Jump 5 Inches Higher in 10 Minutes',
        channel: 'PJF Performance',
        category: 'strength',
        youtubeId: 'lInosfIsKOM',
      },
    ],
  },
  {
    id: 'soccer',
    name: 'Soccer',
    tagline: 'First touch, finishing, and speed you can repeat all game.',
    emoji: '⚽',
    accent: '#22c55e',
    videos: [
      {
        id: 'soccer-1',
        title: '5 Essential First Touch Drills',
        channel: 'Become Elite',
        category: 'skill',
        youtubeId: 'JbOwpq_8CeM',
      },
      {
        id: 'soccer-2',
        title: '5 First Touch Exercises for Footballers',
        channel: '7mlc',
        category: 'skill',
        youtubeId: 'el7QvVnprOk',
      },
      {
        id: 'soccer-3',
        title: 'Speed & Agility Training Session',
        channel: '7mlc',
        category: 'strength',
        youtubeId: 'Ynh_wFGlN9A',
      },
    ],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    tagline: 'Cleaner strokes, a reliable serve, and rotational strength.',
    emoji: '🎾',
    accent: '#eab308',
    videos: [
      {
        id: 'tennis-1',
        title: 'Perfect Forehand in 5 Steps',
        channel: 'Crunch Time Coaching',
        category: 'skill',
        youtubeId: 'zhaN3TCjrDk',
      },
      {
        id: 'tennis-2',
        title: 'Perfect Serve in 5 Steps',
        channel: 'Top Tennis Training',
        category: 'skill',
        youtubeId: '6998O764rKU',
      },
      {
        id: 'tennis-3',
        title: '10-Minute Ab Workout (No Equipment)',
        channel: 'Pamela Reif',
        category: 'strength',
        youtubeId: 'AnYl6Nk9GOA',
      },
    ],
  },
  {
    id: 'weightlifting',
    name: 'Weightlifting',
    tagline: 'Barbell fundamentals and a program that carries over.',
    emoji: '🏋️',
    accent: '#a855f7',
    videos: [
      {
        id: 'wl-1',
        title: 'The Back Squat',
        channel: 'CrossFit',
        category: 'skill',
        youtubeId: 'ultWZbUMPL8',
      },
      {
        id: 'wl-2',
        title: 'How to Deadlift: 5-Step Setup',
        channel: 'Alan Thrall',
        category: 'skill',
        youtubeId: 'wYREQkVtvEc',
      },
      {
        id: 'wl-3',
        title: 'Science-Based Minimalist Workout Plan',
        channel: 'Jeff Nippard',
        category: 'strength',
        youtubeId: 'eMjyvIQbn9M',
      },
    ],
  },
]
