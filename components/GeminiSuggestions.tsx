
import React, { useState } from 'react';
import { generateTextSuggestions, generateColorPalette } from '../services/geminiService';
import { BalloonConfig } from '../types';
import { Sparkles } from 'lucide-react';

interface GeminiSuggestionsProps {
  setConfig: React.Dispatch<React.SetStateAction<BalloonConfig>>;
}

const GeminiSuggestions: React.FC<GeminiSuggestionsProps> = ({ setConfig }) => {
  const [occasion, setOccasion] = useState('Birthday');
  const [theme, setTheme] = useState('Festive');
  const [textSuggestions, setTextSuggestions] = useState<string[]>([]);
  const [colorSuggestions, setColorSuggestions] = useState<string[]>([]);
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isColorLoading, setIsColorLoading] = useState(false);

  const fetchTextSuggestions = async () => {
    setIsTextLoading(true);
    const suggestions = await generateTextSuggestions(occasion);
    setTextSuggestions(suggestions);
    setIsTextLoading(false);
  };

  const fetchColorSuggestions = async () => {
    setIsColorLoading(true);
    const palette = await generateColorPalette(theme);
    setColorSuggestions(palette);
    setIsColorLoading(false);
  };

  const applyText = (text: string) => {
    setConfig(prev => ({ ...prev, text: { ...prev.text, content: text } }));
  };

  const applyColor = (color: string) => {
    setConfig(prev => ({ ...prev, color }));
  };

  const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  );

  return (
    <div className="space-y-6 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2 text-pink-500">
        <Sparkles size={20} />
        <h3 className="font-semibold text-lg">AI Suggestions</h3>
      </div>
      
      {/* Text Suggestions */}
      <div className="space-y-3">
        <label className="font-medium">Message Ideas</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            placeholder="e.g., Anniversary"
          />
          <button
            onClick={fetchTextSuggestions}
            disabled={isTextLoading}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:bg-pink-300 flex items-center justify-center min-w-[100px]"
          >
            {isTextLoading ? <LoadingSpinner /> : 'Generate'}
          </button>
        </div>
        {textSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {textSuggestions.map((text, i) => (
              <button key={i} onClick={() => applyText(text)} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">
                {text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Suggestions */}
      <div className="space-y-3">
        <label className="font-medium">Color Palette Ideas</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            placeholder="e.g., Pastel, Vibrant"
          />
          <button
            onClick={fetchColorSuggestions}
            disabled={isColorLoading}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:bg-pink-300 flex items-center justify-center min-w-[100px]"
          >
            {isColorLoading ? <LoadingSpinner /> : 'Generate'}
          </button>
        </div>
        {colorSuggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {colorSuggestions.map((color, i) => (
              <button
                key={i}
                onClick={() => applyColor(color)}
                style={{ backgroundColor: color }}
                className="w-8 h-8 rounded-full border border-gray-200 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiSuggestions;
