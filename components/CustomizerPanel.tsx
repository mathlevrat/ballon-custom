
import React from 'react';
import { BalloonConfig, BalloonShape } from '../types';
import { PRESET_COLORS, FONTS } from '../constants';
import ColorPicker from './ColorPicker';
import GeminiSuggestions from './GeminiSuggestions';
import { Heart, Star, Circle } from 'lucide-react';

interface CustomizerPanelProps {
  config: BalloonConfig;
  setConfig: React.Dispatch<React.SetStateAction<BalloonConfig>>;
}

const CustomizerPanel: React.FC<CustomizerPanelProps> = ({ config, setConfig }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, text: { ...prev.text, content: e.target.value } }));
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfig(prev => ({ ...prev, text: { ...prev.text, fontFamily: e.target.value } }));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, text: { ...prev.text, fontSize: Number(e.target.value) } }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ ...prev, image: { ...prev.image, src: event.target?.result as string } }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const ShapeButton = ({ shape, Icon }: { shape: BalloonShape; Icon: React.ElementType }) => (
    <button
      onClick={() => setConfig(prev => ({ ...prev, shape }))}
      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
        config.shape === shape ? 'bg-pink-500 border-pink-500 text-white' : 'bg-white border-gray-300 text-gray-500 hover:border-pink-400 hover:text-pink-400'
      }`}
    >
      <Icon size={24} />
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* Shape */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Shape</h3>
        <div className="grid grid-cols-3 gap-3">
          <ShapeButton shape="round" Icon={Circle} />
          <ShapeButton shape="heart" Icon={Heart} />
          <ShapeButton shape="star" Icon={Star} />
        </div>
      </div>

      {/* Balloon Color */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Balloon Color</h3>
        <ColorPicker
          colors={PRESET_COLORS}
          selectedColor={config.color}
          onChange={(color) => setConfig(prev => ({ ...prev, color }))}
        />
      </div>

      {/* Text Customization */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Text</h3>
        <input
          type="text"
          value={config.text.content}
          onChange={handleTextChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          placeholder="Your message"
        />
        <div className="flex items-center gap-4">
          <select
            value={config.text.fontFamily}
            onChange={handleFontChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          >
            {FONTS.map(font => (
              <option key={font.name} value={font.value} className={font.className}>{font.name}</option>
            ))}
          </select>
          <ColorPicker
            colors={['#FFFFFF', '#000000', ...PRESET_COLORS.slice(0, 5)]}
            selectedColor={config.text.color}
            onChange={(color) => setConfig(prev => ({ ...prev, text: { ...prev.text, color } }))}
            isCompact={true}
          />
        </div>
        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size: {config.text.fontSize}px</label>
          <input
            id="fontSize"
            type="range"
            min="10"
            max="80"
            value={config.text.fontSize}
            onChange={handleFontSizeChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>
      </div>
      
      {/* Image Upload */}
       <div>
        <h3 className="font-semibold text-lg mb-3">Image / Logo</h3>
        <label htmlFor="file-upload" className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-pink-400 transition-colors">
          <span className="text-sm text-gray-600">{config.image.src ? 'Change Image' : 'Upload Image'}</span>
        </label>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/png, image/jpeg, image/svg+xml" />
        {config.image.src && (
            <button 
              onClick={() => setConfig(prev => ({ ...prev, image: { ...prev.image, src: null } }))} 
              className="mt-2 text-sm text-red-500 hover:text-red-700"
            >
              Remove Image
            </button>
        )}
      </div>

      {/* AI Suggestions */}
      <GeminiSuggestions setConfig={setConfig} />
    </div>
  );
};

export default CustomizerPanel;
