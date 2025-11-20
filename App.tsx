
import React, { useState } from 'react';
import CustomizerPanel from './components/CustomizerPanel';
import PreviewPanel from './components/PreviewPanel';
import { BalloonConfig, BalloonShape } from './types';
import { PRESET_COLORS, FONTS } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<BalloonConfig>({
    shape: 'round',
    color: PRESET_COLORS[0],
    text: {
      content: 'Hello!',
      fontFamily: FONTS[0].value,
      fontSize: 40,
      color: '#ffffff',
    },
    image: {
      src: null,
      size: 100,
      x: 0,
      y: 0,
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 font-poppins text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-500">Balloon Customizer AI</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <CustomizerPanel config={config} setConfig={setConfig} />
          </div>
          <div className="w-full lg:w-2/3 xl:w-3/4 flex-grow">
            <PreviewPanel config={config} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Built with React, Tailwind CSS, and Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
