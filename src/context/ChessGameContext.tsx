import React, { createContext, useContext, useState, useEffect } from 'react';
import { Board, ChessPiece, Square, Move } from '../types/chess';
import { 
  setupBoard, 
  getPossibleMoves, 
  movePiece,
  getInitialBoardForLevel,
  isCheck,
  isLevelCompleted,
  findBestMoveHint,
  isValidMove
} from '../utils/chessEngine';
import { getLevelCompletion, saveLevelCompletion } from '../utils/levelUtils';
import { playMoveSound, playCaptureSound, playCheckSound, playLevelCompleteSound } from '../utils/soundEffects';

type ChessColor = 'white' | 'black';

interface ChessGameContextType {
  board: Board;
  selectedPiece: Square | null;
  setSelectedPiece: (square: Square | null) => void;
  possibleMoves: Square[];
  makeMove: (from: Square, to: Square) => void;
  currentLevel: number;
  whiteToMove: boolean;
  moveHistory: Move[];
  undoHistory: Move[];
  showHint: () => void;
  resetLevel: () => void;
  undo: () => void;
  redo: () => void;
  levelCompleted: boolean;
  loadLevel: (level: number) => void;
  loadNextLevel: () => void;
  checkStatus: ChessColor | null;
}

const ChessGameContext = createContext<ChessGameContextType | undefined>(undefined);

export const ChessGameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState(() => {
    const savedLevel = localStorage.getItem('currentLevel');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  
  const [board, setBoard] = useState<Board>(() => getInitialBoardForLevel(currentLevel));
  const [selectedPiece, setSelectedPiece] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [whiteToMove, setWhiteToMove] = useState(true);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [undoHistory, setUndoHistory] = useState<Move[]>([]);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [checkStatus, setCheckStatus] = useState<ChessColor | null>(null);
  
  useEffect(() => {
    if (selectedPiece) {
      const moves = getPossibleMoves(board, selectedPiece, whiteToMove);
      setPossibleMoves(moves);
    } else {
      setPossibleMoves([]);
    }
  }, [board, selectedPiece, whiteToMove]);
  
  useEffect(() => {
    if (isCheck(board, 'white')) {
      setCheckStatus('white');
      playCheckSound();
    } else if (isCheck(board, 'black')) {
      setCheckStatus('black');
      playCheckSound();
    } else {
      setCheckStatus(null);
    }
  }, [board]);
  
  useEffect(() => {
    localStorage.setItem('currentLevel', currentLevel.toString());
  }, [currentLevel]);
  
  const makeMove = (from: Square, to: Square) => {
    if (!isValidMove(board, from, to, whiteToMove)) return;
    
    const piece = board[from.row][from.col];
    if (!piece) return;
    
    const newBoard = movePiece(board, from, to);
    setBoard(newBoard);
    setSelectedPiece(null);
    setWhiteToMove(!whiteToMove);
    
    const move: Move = {
      piece,
      from,
      to,
      capturedPiece: board[to.row][to.col] || null
    };
    
    if (move.capturedPiece) {
      playCaptureSound();
    } else {
      playMoveSound();
    }
    
    setMoveHistory([...moveHistory, move]);
    setUndoHistory([]);
    
    const completed = isLevelCompleted(newBoard, currentLevel, moveHistory.length + 1);
    if (completed) {
      setLevelCompleted(true);
      saveLevelCompletion(currentLevel, true);
      playLevelCompleteSound();
    } else {
      const { attempts } = getLevelCompletion(currentLevel);
      saveLevelCompletion(currentLevel, false, attempts + 1);
      
      if (!completed && whiteToMove) {
        setTimeout(() => {
          const aiMove = findBestMoveHint(newBoard, false);
          if (aiMove) {
            const { from: aiFrom, to: aiTo } = aiMove;
            const aiPiece = newBoard[aiFrom.row][aiFrom.col];
            if (aiPiece) {
              const aiNewBoard = movePiece(newBoard, aiFrom, aiTo);
              setBoard(aiNewBoard);
              setWhiteToMove(true);
              
              const aiMoveObj: Move = {
                piece: aiPiece,
                from: aiFrom,
                to: aiTo,
                capturedPiece: newBoard[aiTo.row][aiTo.col] || null
              };
              
              if (aiMoveObj.capturedPiece) {
                playCaptureSound();
              } else {
                playMoveSound();
              }
              
              setMoveHistory([...moveHistory, move, aiMoveObj]);
            }
          }
        }, 500);
      }
    }
  };
  
  const resetLevel = () => {
    setBoard(getInitialBoardForLevel(currentLevel));
    setSelectedPiece(null);
    setWhiteToMove(true);
    setMoveHistory([]);
    setUndoHistory([]);
    setLevelCompleted(false);
  };
  
  const loadLevel = (level: number) => {
    setCurrentLevel(level);
    setBoard(getInitialBoardForLevel(level));
    setSelectedPiece(null);
    setWhiteToMove(true);
    setMoveHistory([]);
    setUndoHistory([]);
    setLevelCompleted(false);
  };
  
  const loadNextLevel = () => {
    const nextLevel = Math.min(currentLevel + 1, 10);
    loadLevel(nextLevel);
  };
  
  const showHint = () => {
    const hint = findBestMoveHint(board, whiteToMove);
    if (hint) {
      setSelectedPiece(hint.from);
    }
  };
  
  const undo = () => {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory[moveHistory.length - 1];
    const newMoveHistory = moveHistory.slice(0, -1);
    
    const newBoard = [...board.map(row => [...row])];
    
    newBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;
    
    if (lastMove.capturedPiece) {
      newBoard[lastMove.to.row][lastMove.to.col] = lastMove.capturedPiece;
    } else {
      newBoard[lastMove.to.row][lastMove.to.col] = null;
    }
    
    setBoard(newBoard);
    setMoveHistory(newMoveHistory);
    setUndoHistory([...undoHistory, lastMove]);
    setWhiteToMove(!whiteToMove);
    setLevelCompleted(false);
    playMoveSound();
  };
  
  const redo = () => {
    if (undoHistory.length === 0) return;
    
    const moveToRedo = undoHistory[undoHistory.length - 1];
    const newUndoHistory = undoHistory.slice(0, -1);
    
    const newBoard = [...board.map(row => [...row])];
    
    newBoard[moveToRedo.to.row][moveToRedo.to.col] = moveToRedo.piece;
    newBoard[moveToRedo.from.row][moveToRedo.from.col] = null;
    
    setBoard(newBoard);
    setMoveHistory([...moveHistory, moveToRedo]);
    setUndoHistory(newUndoHistory);
    setWhiteToMove(!whiteToMove);
    
    if (moveToRedo.capturedPiece) {
      playCaptureSound();
    } else {
      playMoveSound();
    }
    
    const completed = isLevelCompleted(newBoard, currentLevel, moveHistory.length + 1);
    if (completed) {
      setLevelCompleted(true);
      saveLevelCompletion(currentLevel, true);
      playLevelCompleteSound();
    }
  };

  return (
    <ChessGameContext.Provider
      value={{
        board,
        selectedPiece,
        setSelectedPiece,
        possibleMoves,
        makeMove,
        currentLevel,
        whiteToMove,
        moveHistory,
        undoHistory,
        showHint,
        resetLevel,
        undo,
        redo,
        levelCompleted,
        loadLevel,
        loadNextLevel,
        checkStatus,
      }}
    >
      {children}
    </ChessGameContext.Provider>
  );
};

export const useChessGame = () => {
  const context = useContext(ChessGameContext);
  if (context === undefined) {
    throw new Error('useChessGame must be used within a ChessGameProvider');
  }
  return context;
};