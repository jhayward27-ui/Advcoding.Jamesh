import type { Sport } from '../types'

/**
 * Curated starter catalog. Each sport pairs on-field skill work with a
 * weight-room block so athletes can train the full picture.
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
        title: 'Daily Ball-Handling Routine',
        channel: 'ILoveBasketballTV',
        duration: '11:24',
        category: 'skill',
        youtubeId: 'Vmg0Eq7Bcqo',
      },
      {
        id: 'bball-2',
        title: 'Fix Your Jump Shot Form',
        channel: 'ShotMechanics',
        duration: '9:02',
        category: 'skill',
        youtubeId: 'FGqk9Nx3Uwc',
      },
      {
        id: 'bball-3',
        title: 'Explosive Vertical Jump Workout',
        channel: 'THE PJF PERFORMANCE',
        duration: '14:10',
        category: 'strength',
        youtubeId: 'l9nh1l8ZIJQ',
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
        title: 'First Touch Training Drills',
        channel: 'AllAttack',
        duration: '8:47',
        category: 'skill',
        youtubeId: 'zN4Nl-Vp3_A',
      },
      {
        id: 'soccer-2',
        title: 'Finishing & Shooting Session',
        channel: '7mlc',
        duration: '10:31',
        category: 'skill',
        youtubeId: 'a0G44Jq3Q1w',
      },
      {
        id: 'soccer-3',
        title: 'Speed & Agility for Footballers',
        channel: '7mlc',
        duration: '12:55',
        category: 'strength',
        youtubeId: 'z2fN8p1cvJc',
      },
    ],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    tagline: 'Cleaner strokes, footwork patterns, and rotational strength.',
    emoji: '🎾',
    accent: '#eab308',
    videos: [
      {
        id: 'tennis-1',
        title: 'Forehand Technique Explained',
        channel: 'Top Tennis Training',
        duration: '13:18',
        category: 'skill',
        youtubeId: 'Hp2Ww8Nz3sQ',
      },
      {
        id: 'tennis-2',
        title: 'Footwork Drills for Tennis',
        channel: 'Intuitive Tennis',
        duration: '7:39',
        category: 'skill',
        youtubeId: 'kR6TxT6d1sE',
      },
      {
        id: 'tennis-3',
        title: 'Core & Rotational Power Workout',
        channel: 'Tennis Fitness',
        duration: '15:20',
        category: 'strength',
        youtubeId: 'AnYl6Nk9GOA',
      },
    ],
  },
  {
    id: 'weightlifting',
    name: 'Weightlifting',
    tagline: 'Barbell fundamentals and accessory work that carries over.',
    emoji: '🏋️',
    accent: '#a855f7',
    videos: [
      {
        id: 'wl-1',
        title: 'How to Squat With Perfect Form',
        channel: 'Squat University',
        duration: '10:05',
        category: 'skill',
        youtubeId: 'ultWZbUMPL8',
      },
      {
        id: 'wl-2',
        title: 'Deadlift Setup & Technique',
        channel: 'Alan Thrall',
        duration: '9:48',
        category: 'skill',
        youtubeId: 'wYREQkVtvEc',
      },
      {
        id: 'wl-3',
        title: 'Full Body Strength Program',
        channel: 'Jeff Nippard',
        duration: '16:42',
        category: 'strength',
        youtubeId: 'eMjyvIQbn9M',
      },
    ],
  },
]
