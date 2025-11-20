import React from 'react';
import { BalloonShape } from './types';

export const PRESET_COLORS: string[] = [
  '#EF4444', '#F97316', '#FBBF24', '#84CC16', '#22C55E', '#14B8A6',
  '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#78716C'
];

export const FONTS: { name: string; value: string; className: string }[] = [
  { name: 'Poppins', value: 'Poppins, sans-serif', className: 'font-poppins' },
  { name: 'Pacifico', value: 'Pacifico, cursive', className: 'font-pacifico' },
  { name: 'Caveat', value: 'Caveat, cursive', className: 'font-caveat' },
  { name: 'Bangers', value: 'Bangers, cursive', className: 'font-bangers' },
];

// FIX: Use React.ReactElement instead of JSX.Element to resolve "Cannot find namespace 'JSX'" error.
export const SHAPE_PATHS: Record<BalloonShape, React.ReactElement> = {
  round: <circle cx="150" cy="150" r="140" />,
  heart: <path d="M150 72.3c-26.2-31.5-74.1-39.7-104.1-13.4C14.7 85.2 1.3 129.7 28.6 161.4L150 280l121.4-118.6c27.3-31.7 13.9-76.2-17.3-102.7-30-26.3-77.9-18.1-104.1 13.4z" />,
  star: <path d="M150 10l46.3 93.7 103.7 15.1-75 73.1 17.7 103.3L150 242.5l-92.7 48.7 17.7-103.3-75-73.1 103.7-15.1z" />,
};

export const SHAPE_VIEWS: Record<BalloonShape, string> = {
  round: '0 0 300 300',
  heart: '0 0 300 300',
  star: '0 0 300 300',
};

export const TEXT_POSITION: Record<BalloonShape, { x: string, y: string }> = {
  round: { x: '50%', y: '50%' },
  heart: { x: '50%', y: '55%' },
  star: { x: '50%', y: '55%' },
};

export const IMAGE_POSITION: Record<BalloonShape, { x: number, y: number }> = {
    round: { x: 150, y: 150 },
    heart: { x: 150, y: 155 },
    star: { x: 150, y: 160 },
};
