import React from 'react';
import { StarIcon } from './Icons';
import { useChessGame } from '../context/ChessGameContext';
import { Sparkles } from 'lucide-react';
import { getLevelCompletion } from '../utils/levelUtils';

const LevelSelector: React.FC = () => {
  const { loadLevel, currentLevel } = useChessGame();
  const totalLevels = 10;
  
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Chess Puzzle Levels</h2>
      <p className="text-gray-600 mb-6">
        Each level contains a puzzle with a specific solution length. 
        Complete all 10 levels to become a chess puzzle master!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: totalLevels }, (_, i) => {
          const levelNumber = i + 1;
          const isCurrentLevel = currentLevel === levelNumber;
          const { completed, attempts } = getLevelCompletion(levelNumber);
          const isLocked = levelNumber > 1 && !getLevelCompletion(levelNumber - 1).completed;
          
          return (
            <div 
              key={levelNumber}
              className={`
                relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105
                ${isCurrentLevel ? 'ring-2 ring-blue-500' : ''}
                ${isLocked ? 'opacity-50' : ''}
              `}
            >
              <div 
                className={`
                  p-4 cursor-pointer
                  ${completed ? 'bg-green-50' : 'bg-white'}
                `}
                onClick={() => !isLocked && loadLevel(levelNumber)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-800">Level {levelNumber}</h3>
                  {completed && (
                    <div className="text-green-600">
                      <StarIcon filled className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Sparkles className="h-3 w-3 mr-1" />
                  <span>{levelNumber === 1 ? '1 move solution' : `${levelNumber} moves solution`}</span>
                </div>
                
                {attempts > 0 && !completed && (
                  <div className="text-xs text-amber-600">
                    {attempts} attempt{attempts > 1 ? 's' : ''}
                  </div>
                )}
                
                {isLocked && (
                  <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;