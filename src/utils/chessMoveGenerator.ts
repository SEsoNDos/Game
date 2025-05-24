import { Board, ChessPiece, Square, Move } from '../types/chess';
import { getPossibleMoves, movePiece, isCheck, isValidMove } from './chessEngine';

// Function to simulate and find the best counter move for the opponent
export function findBestCounterMove(board: Board, isWhiteTurn: boolean): Move | null {
  const color = isWhiteTurn ? 'white' : 'black';
  let bestMove: Move | null = null;
  let bestScore = -Infinity;
  
  // Evaluate all possible moves for the current player
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const from = { row, col };
        const possibleMoves = getPossibleMoves(board, from, isWhiteTurn);
        
        for (const to of possibleMoves) {
          const capturedPiece = board[to.row][to.col];
          const newBoard = movePiece(board, from, to);
          
          // Evaluate the move
          const score = evaluatePosition(newBoard, color);
          
          if (score > bestScore) {
            bestScore = score;
            bestMove = {
              piece,
              from,
              to,
              capturedPiece
            };
          }
        }
      }
    }
  }
  
  return bestMove;
}

// Simple position evaluation function
function evaluatePosition(board: Board, color: 'white' | 'black'): number {
  const pieceValues: Record<string, number> = {
    'pawn': 1,
    'knight': 3,
    'bishop': 3,
    'rook': 5,
    'queen': 9,
    'king': 100
  };
  
  let score = 0;
  
  // Count material
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = pieceValues[piece.type];
        if (piece.color === color) {
          score += value;
        } else {
          score -= value;
        }
      }
    }
  }
  
  // Bonus for checking the opponent
  const opponentColor = color === 'white' ? 'black' : 'white';
  if (isCheck(board, opponentColor)) {
    score += 0.5;
  }
  
  // Bonus for controlling the center
  const centerSquares = [
    board[3][3], board[3][4], board[4][3], board[4][4]
  ];
  
  for (const piece of centerSquares) {
    if (piece && piece.color === color) {
      score += 0.2;
    }
  }
  
  return score;
}