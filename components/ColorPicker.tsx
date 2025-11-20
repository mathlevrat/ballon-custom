
import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  isCompact?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onChange, isCompact = false }) => {
  const sizeClasses = isCompact ? 'w-6 h-6' : 'w-8 h-8';
  const gridClasses = isCompact ? 'grid-cols-6' : 'grid-cols-6';

  return (
    <div className={`grid ${gridClasses} gap-2`}>
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`rounded-full ${sizeClasses} transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-pink-500' : 'ring-1 ring-gray-200'}`}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
