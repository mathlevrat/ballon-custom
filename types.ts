
export type BalloonShape = 'round' | 'heart' | 'star';

export interface TextConfig {
  content: string;
  fontFamily: string;
  fontSize: number;
  color: string;
}

export interface ImageConfig {
  src: string | null;
  size: number;
  x: number;
  y: number;
}

export interface BalloonConfig {
  shape: BalloonShape;
  color: string;
  text: TextConfig;
  image: ImageConfig;
}
