import React, { useEffect } from 'react';
import { useChessGame } from '../context/ChessGameContext';
import { Square } from '../types/chess';
import { getPieceImage } from '../utils/chessPieces';

const ChessBoard: React.FC = () => {
  const { 
    board, 
    selectedPiece, 
    setSelectedPiece, 
    possibleMoves, 
    makeMove,
    checkStatus,
    levelCompleted
  } = useChessGame();

  const renderSquare = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0;
    const square: Square = { row, col };
    const piece = board[row][col];
    const isSelected = selectedPiece?.row === row && selectedPiece?.col === col;
    const isPossibleMove = possibleMoves.some(move => move.row === row && move.col === col);
    const isCheck = checkStatus && piece && piece.type === 'king' && piece.color === checkStatus;

    const handleClick = () => {
      if (levelCompleted) return;
      
      // If a piece is already selected and this is a valid move
      if (selectedPiece && isPossibleMove) {
        makeMove(selectedPiece, square);
        return;
      }
      
      // If the square has a piece on it
      if (piece && piece.color === 'white') {
        setSelectedPiece(square);
        return;
      }
      
      // If clicking an empty square or enemy piece
      setSelectedPiece(null);
    };

    return (
      <div 
        key={`${row}-${col}`}
        className={`relative w-full pt-[100%] ${
          isLight ? 'bg-amber-100' : 'bg-amber-800'
        } ${isSelected ? 'ring-4 ring-blue-500 ring-inset' : ''}
        ${isCheck ? 'ring-4 ring-red-500 ring-inset' : ''}
        cursor-pointer transition-all hover:brightness-90`}
        onClick={handleClick}
      >
        {piece && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={getPieceImage(piece)} 
              alt={`${piece.color} ${piece.type}`}
              className={`w-[80%] h-[80%] ${levelCompleted ? 'animate-bounce' : 'transition-transform duration-300'}`}
            />
          </div>
        )}
        {isPossibleMove && (
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${piece ? 'opacity-70' : ''}`}>
            <div className={`${piece ? 'w-full h-full ring-4 ring-yellow-400 ring-inset' : 'w-3 h-3 rounded-full bg-gray-500 opacity-50'}`}></div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPiece) return;
      
      let newRow = selectedPiece.row;
      let newCol = selectedPiece.col;
      
      switch(e.key) {
        case 'ArrowUp':
          newRow = Math.max(0, newRow - 1);
          break;
        case 'ArrowDown':
          newRow = Math.min(7, newRow + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, newCol - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(7, newCol + 1);
          break;
        case 'Enter':
          const potentialMove = possibleMoves.find(
            move => move.row === selectedPiece.row && move.col === selectedPiece.col
          );
          if (potentialMove) {
            makeMove(selectedPiece, potentialMove);
          }
          break;
        default:
          return;
      }
      
      setSelectedPiece({ row: newRow, col: newCol });
      e.preventDefault();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPiece, possibleMoves, makeMove, setSelectedPiece]);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-xl">
        <div className="grid grid-cols-8">
          {Array.from({ length: 8 }, (_, row) => 
            Array.from({ length: 8 }, (_, col) => renderSquare(row, col))
          ).flat()}
        </div>
      </div>
      
      {/* Rank and file labels */}
      <div className="absolute top-0 bottom-0 left-[-20px] flex flex-col justify-around pointer-events-none text-xs font-medium">
        {[8, 7, 6, 5, 4, 3, 2, 1].map(num => (
          <div key={num} className="h-[12.5%] flex items-center text-gray-600">{num}</div>
        ))}
      </div>
      <div className="absolute left-0 right-0 bottom-[-20px] flex justify-around pointer-events-none text-xs font-medium">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
          <div key={letter} className="w-[12.5%] text-center text-gray-600">{letter}</div>
        ))}
      </div>
      
      {levelCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center animate-bounce-in">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Level Complete!</h3>
            <p className="text-gray-700">You solved the puzzle in the optimal number of moves.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;