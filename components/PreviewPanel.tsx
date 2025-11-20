
import React from 'react';
import { BalloonConfig } from '../types';
import { SHAPE_PATHS, SHAPE_VIEWS, TEXT_POSITION, IMAGE_POSITION } from '../constants';

interface PreviewPanelProps {
  config: BalloonConfig;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  const { shape, color, text, image } = config;

  const viewBox = SHAPE_VIEWS[shape];
  const textPos = TEXT_POSITION[shape];
  const imagePos = IMAGE_POSITION[shape];

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg h-full flex items-center justify-center sticky top-8">
      <div className="w-full max-w-lg aspect-square relative">
        <svg
          viewBox={viewBox}
          className="w-full h-full drop-shadow-xl"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <radialGradient id="balloonShine" cx="0.35" cy="0.35" r="0.5">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g>
            {/* FIX: Explicitly specify the generic type for React.cloneElement to ensure SVG props like 'fill' are recognized. */}
            {React.cloneElement<React.SVGProps<SVGElement>>(SHAPE_PATHS[shape], { fill: color })}
            {/* FIX: Explicitly specify the generic type for React.cloneElement to ensure SVG props like 'fill' are recognized. */}
            {React.cloneElement<React.SVGProps<SVGElement>>(SHAPE_PATHS[shape], { fill: 'url(#balloonShine)' })}
            
            {image.src && (
              <image
                href={image.src}
                x={imagePos.x - image.size / 2}
                y={imagePos.y - image.size / 2}
                width={image.size}
                height={image.size}
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            <text
              x={textPos.x}
              y={textPos.y}
              dy=".3em"
              textAnchor="middle"
              fill={text.color}
              fontSize={text.fontSize}
              fontFamily={text.fontFamily}
              fontWeight="bold"
              className="select-none"
            >
              {text.content}
            </text>
          </g>
          <path d="M150 290 Q150 350 140 400" stroke={color} strokeWidth="3" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default PreviewPanel;