import React from 'react';
import { ArrowLeft, Lightbulb, RotateCcw, RotateCw } from 'lucide-react';
import { useChessGame } from '../context/ChessGameContext';
import { getChessMoveNotation } from '../utils/chessNotation';

const GameControls: React.FC = () => {
  const { 
    currentLevel, 
    moveHistory, 
    whiteToMove,
    showHint,
    resetLevel,
    undo,
    redo,
    levelCompleted,
    loadNextLevel,
    undoHistory,
    checkStatus,
  } = useChessGame();

  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Game Info</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${whiteToMove ? 'bg-white border border-gray-300' : 'bg-black'}`}></div>
          <span className="text-sm">{whiteToMove ? 'White' : 'Black'} to move</span>
          {checkStatus && (
            <span className="text-sm font-medium text-red-600 ml-2">
              {checkStatus === 'white' ? 'White' : 'Black'} in check!
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600">
          <p>Find the winning solution in <strong>{currentLevel}</strong> move{currentLevel > 1 ? 's' : ''}.</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-800">Move History</h3>
          <div className="flex gap-1">
            <button 
              onClick={undo} 
              disabled={moveHistory.length === 0}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              title="Undo move"
            >
              <RotateCcw size={16} />
            </button>
            <button 
              onClick={redo} 
              disabled={undoHistory.length === 0}
              className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              title="Redo move"
            >
              <RotateCw size={16} />
            </button>
          </div>
        </div>
        
        <div className="h-40 overflow-y-auto bg-white rounded border border-gray-200 p-2">
          {moveHistory.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No moves yet</p>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {moveHistory.map((move, index) => (
                index % 2 === 0 && (
                  <React.Fragment key={index}>
                    <div className="text-sm flex items-center">
                      <span className="w-6 text-right text-gray-500">{Math.floor(index / 2) + 1}.</span>
                      <span className="ml-1">{getChessMoveNotation(move)}</span>
                    </div>
                    {moveHistory[index + 1] && (
                      <div className="text-sm">
                        {getChessMoveNotation(moveHistory[index + 1])}
                      </div>
                    )}
                  </React.Fragment>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={showHint}
          disabled={levelCompleted}
          className="w-full py-2 px-4 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 disabled:opacity-50 disabled:hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
        >
          <Lightbulb size={16} />
          <span>Show Hint</span>
        </button>
        
        <button
          onClick={resetLevel}
          className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          <span>Reset Level</span>
        </button>
        
        {levelCompleted && (
          <button
            onClick={loadNextLevel}
            className="w-full py-2 px-4 mt-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2 animate-pulse"
          >
            <ArrowLeft size={16} className="rotate-180" />
            <span>Next Level</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;