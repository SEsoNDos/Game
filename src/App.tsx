import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
import LevelSelector from './components/LevelSelector';
import { ChessGameProvider } from './context/ChessGameContext';
import Header from './components/Header';
import { getCurrentLevel, getTotalLevelsCompleted } from './utils/levelUtils';

function App() {
  const [selectedTab, setSelectedTab] = useState<'play' | 'levels'>('play');
  const totalLevelsCompleted = getTotalLevelsCompleted();
  const currentLevel = getCurrentLevel();

  return (
    <ChessGameProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-7xl mx-auto w-full">
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('play')}
                className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                  selectedTab === 'play'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Play Chess
              </button>
              <button
                onClick={() => setSelectedTab('levels')}
                className={`px-6 py-3 text-sm font-medium focus:outline-none flex items-center gap-1 ${
                  selectedTab === 'levels'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Levels
                {totalLevelsCompleted > 0 && (
                  <span className="flex items-center justify-center bg-green-100 text-green-800 text-xs font-medium rounded-full h-5 w-5">
                    {totalLevelsCompleted}
                  </span>
                )}
              </button>
            </div>
            
            <div className="p-6">
              {selectedTab === 'play' ? (
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:flex-1">
                    <div className="mb-4 flex items-center">
                      <h2 className="text-xl font-bold text-gray-800">Level {currentLevel}</h2>
                      <div className="ml-2 flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        <Sparkles className="h-3 w-3 mr-1" />
                        <span>{currentLevel === 1 ? '1 move solution' : `${currentLevel} moves solution`}</span>
                      </div>
                    </div>
                    <ChessBoard />
                  </div>
                  <div className="lg:w-80">
                    <GameControls />
                  </div>
                </div>
              ) : (
                <LevelSelector />
              )}
            </div>
          </div>
        </main>
        
        <footer className="py-4 text-center text-gray-500 text-sm">
          Chess Puzzle Challenge © {new Date().getFullYear()}
        </footer>
      </div>
    </ChessGameProvider>
  );
}

export default App;