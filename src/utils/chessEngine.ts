import { Board, ChessPiece, Square, ChessPieceType, ChessPieceColor, Move } from '../types/chess';

export function setupBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Set up other pieces
  const backRowPieces: ChessPieceType[] = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
  ];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRowPieces[col], color: 'black' };
    board[7][col] = { type: backRowPieces[col], color: 'white' };
  }
  
  return board;
}

export function getInitialBoardForLevel(level: number): Board {
  // Create an empty board
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Setup different puzzles based on level
  switch(level) {
    case 1: // One move checkmate
      board[7][0] = { type: 'king', color: 'white' };
      board[0][7] = { type: 'king', color: 'black' };
      board[2][0] = { type: 'queen', color: 'white' };
      break;
      
    case 2: // Two move checkmate
      board[7][0] = { type: 'king', color: 'white' };
      board[0][7] = { type: 'king', color: 'black' };
      board[7][7] = { type: 'rook', color: 'white' };
      board[5][6] = { type: 'pawn', color: 'white' };
      break;
      
    case 3: // Three move checkmate
      board[7][0] = { type: 'king', color: 'white' };
      board[0][0] = { type: 'king', color: 'black' };
      board[5][1] = { type: 'queen', color: 'white' };
      board[2][2] = { type: 'pawn', color: 'black' };
      break;
      
    case 4: // Four move checkmate
      board[7][4] = { type: 'king', color: 'white' };
      board[0][4] = { type: 'king', color: 'black' };
      board[6][0] = { type: 'rook', color: 'white' };
      board[7][7] = { type: 'rook', color: 'white' };
      board[1][7] = { type: 'pawn', color: 'black' };
      board[1][3] = { type: 'pawn', color: 'black' };
      break;
      
    case 5: // Five move puzzle
      board[7][4] = { type: 'king', color: 'white' };
      board[0][4] = { type: 'king', color: 'black' };
      board[7][3] = { type: 'queen', color: 'white' };
      board[2][0] = { type: 'rook', color: 'white' };
      board[1][1] = { type: 'pawn', color: 'black' };
      board[2][4] = { type: 'pawn', color: 'black' };
      board[1][6] = { type: 'knight', color: 'black' };
      break;
      
    case 6: // Six move puzzle
      board[7][0] = { type: 'king', color: 'white' };
      board[0][7] = { type: 'king', color: 'black' };
      board[5][2] = { type: 'queen', color: 'white' };
      board[6][5] = { type: 'bishop', color: 'white' };
      board[3][3] = { type: 'knight', color: 'white' };
      board[1][0] = { type: 'rook', color: 'black' };
      board[2][6] = { type: 'pawn', color: 'black' };
      break;
      
    case 7: // Seven move puzzle
      board[7][0] = { type: 'king', color: 'white' };
      board[0][7] = { type: 'king', color: 'black' };
      board[7][1] = { type: 'queen', color: 'white' };
      board[7][7] = { type: 'rook', color: 'white' };
      board[6][4] = { type: 'pawn', color: 'white' };
      board[0][0] = { type: 'rook', color: 'black' };
      board[1][2] = { type: 'pawn', color: 'black' };
      board[1][5] = { type: 'bishop', color: 'black' };
      break;
      
    case 8: // Eight move puzzle
      board[7][4] = { type: 'king', color: 'white' };
      board[0][4] = { type: 'king', color: 'black' };
      board[7][5] = { type: 'bishop', color: 'white' };
      board[6][7] = { type: 'knight', color: 'white' };
      board[6][0] = { type: 'pawn', color: 'white' };
      board[5][3] = { type: 'pawn', color: 'white' };
      board[1][2] = { type: 'pawn', color: 'black' };
      board[2][6] = { type: 'bishop', color: 'black' };
      board[2][3] = { type: 'queen', color: 'black' };
      break;
      
    case 9: // Nine move puzzle
      board[7][4] = { type: 'king', color: 'white' };
      board[0][4] = { type: 'king', color: 'black' };
      board[7][3] = { type: 'queen', color: 'white' };
      board[7][0] = { type: 'rook', color: 'white' };
      board[7][7] = { type: 'rook', color: 'white' };
      board[6][5] = { type: 'pawn', color: 'white' };
      board[5][6] = { type: 'knight', color: 'white' };
      board[1][1] = { type: 'pawn', color: 'black' };
      board[0][0] = { type: 'rook', color: 'black' };
      board[0][7] = { type: 'rook', color: 'black' };
      board[1][3] = { type: 'pawn', color: 'black' };
      break;
      
    case 10: // Ten move puzzle - advanced
      board[7][4] = { type: 'king', color: 'white' };
      board[0][4] = { type: 'king', color: 'black' };
      board[7][3] = { type: 'queen', color: 'white' };
      board[7][2] = { type: 'bishop', color: 'white' };
      board[6][1] = { type: 'knight', color: 'white' };
      board[6][3] = { type: 'pawn', color: 'white' };
      board[6][4] = { type: 'pawn', color: 'white' };
      board[6][5] = { type: 'pawn', color: 'white' };
      board[0][3] = { type: 'queen', color: 'black' };
      board[0][2] = { type: 'bishop', color: 'black' };
      board[0][1] = { type: 'knight', color: 'black' };
      board[1][3] = { type: 'pawn', color: 'black' };
      board[1][4] = { type: 'pawn', color: 'black' };
      board[1][5] = { type: 'pawn', color: 'black' };
      break;
      
    default:
      return setupBoard();
  }
  
  return board;
}

export function getPossibleMoves(board: Board, square: Square, isWhiteTurn: boolean): Square[] {
  const piece = board[square.row][square.col];
  if (!piece) return [];
  
  // Can only move your own pieces
  if ((piece.color === 'white' && !isWhiteTurn) || (piece.color === 'black' && isWhiteTurn)) {
    return [];
  }
  
  const moves: Square[] = [];
  
  switch (piece.type) {
    case 'pawn':
      getPawnMoves(board, square, piece.color, moves);
      break;
    case 'knight':
      getKnightMoves(board, square, piece.color, moves);
      break;
    case 'bishop':
      getBishopMoves(board, square, piece.color, moves);
      break;
    case 'rook':
      getRookMoves(board, square, piece.color, moves);
      break;
    case 'queen':
      getQueenMoves(board, square, piece.color, moves);
      break;
    case 'king':
      getKingMoves(board, square, piece.color, moves);
      break;
  }
  
  // Filter out moves that would leave the king in check
  return moves.filter(move => {
    const newBoard = movePiece(board, square, move);
    return !isCheck(newBoard, piece.color);
  });
}

function getPawnMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  const direction = color === 'white' ? -1 : 1;
  const startRow = color === 'white' ? 6 : 1;
  
  // Forward one square
  if (isInBounds(square.row + direction, square.col) && !board[square.row + direction][square.col]) {
    moves.push({ row: square.row + direction, col: square.col });
    
    // Forward two squares from starting position
    if (square.row === startRow && !board[square.row + 2 * direction][square.col]) {
      moves.push({ row: square.row + 2 * direction, col: square.col });
    }
  }
  
  // Captures
  for (const colOffset of [-1, 1]) {
    const newRow = square.row + direction;
    const newCol = square.col + colOffset;
    if (isInBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (target && target.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
}

function getKnightMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  const knightOffsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  
  for (const [rowOffset, colOffset] of knightOffsets) {
    const newRow = square.row + rowOffset;
    const newCol = square.col + colOffset;
    
    if (isInBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target || target.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
}

function getBishopMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  const directions = [
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];
  
  for (const [rowDir, colDir] of directions) {
    let newRow = square.row + rowDir;
    let newCol = square.col + colDir;
    
    while (isInBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      
      newRow += rowDir;
      newCol += colDir;
    }
  }
}

function getRookMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];
  
  for (const [rowDir, colDir] of directions) {
    let newRow = square.row + rowDir;
    let newCol = square.col + colDir;
    
    while (isInBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      
      newRow += rowDir;
      newCol += colDir;
    }
  }
}

function getQueenMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  getBishopMoves(board, square, color, moves);
  getRookMoves(board, square, color, moves);
}

function getKingMoves(board: Board, square: Square, color: ChessPieceColor, moves: Square[]) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  
  for (const [rowDir, colDir] of directions) {
    const newRow = square.row + rowDir;
    const newCol = square.col + colDir;
    
    if (isInBounds(newRow, newCol)) {
      const target = board[newRow][newCol];
      if (!target || target.color !== color) {
        moves.push({ row: newRow, col: newCol });
      }
    }
  }
}

export function movePiece(board: Board, from: Square, to: Square): Board {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[from.row][from.col];
  
  if (!piece) return newBoard;
  
  newBoard[to.row][to.col] = piece;
  newBoard[from.row][from.col] = null;
  
  return newBoard;
}

function isInBounds(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function isCheck(board: Board, color: ChessPieceColor): boolean {
  // Find the king
  let kingPosition: Square | null = null;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        kingPosition = { row, col };
        break;
      }
    }
    if (kingPosition) break;
  }
  
  if (!kingPosition) return false; // King not found
  
  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== color) {
        const attackMoves = getPossibleMovesWithoutCheckFiltering(board, { row, col });
        if (attackMoves.some(move => move.row === kingPosition!.row && move.col === kingPosition!.col)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// A version of getPossibleMoves that doesn't filter out check, to avoid infinite recursion
function getPossibleMovesWithoutCheckFiltering(board: Board, square: Square): Square[] {
  const piece = board[square.row][square.col];
  if (!piece) return [];
  
  const moves: Square[] = [];
  
  switch (piece.type) {
    case 'pawn':
      getPawnMoves(board, square, piece.color, moves);
      break;
    case 'knight':
      getKnightMoves(board, square, piece.color, moves);
      break;
    case 'bishop':
      getBishopMoves(board, square, piece.color, moves);
      break;
    case 'rook':
      getRookMoves(board, square, piece.color, moves);
      break;
    case 'queen':
      getQueenMoves(board, square, piece.color, moves);
      break;
    case 'king':
      getKingMoves(board, square, piece.color, moves);
      break;
  }
  
  return moves;
}

export function isLevelCompleted(board: Board, level: number, moveCount: number): boolean {
  // Each level has a specific solution
  if (level !== moveCount) return false;
  
  return isCheck(board, 'black') || isMate(board, 'black');
}

function isMate(board: Board, color: ChessPieceColor): boolean {
  if (!isCheck(board, color)) return false;
  
  // Check if any move can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const square = { row, col };
        const possibleMoves = getPossibleMoves(board, square, color === 'white');
        if (possibleMoves.length > 0) {
          return false; // There's at least one legal move
        }
      }
    }
  }
  
  return true; // No legal moves
}

export function findBestMoveHint(board: Board, isWhiteTurn: boolean): { from: Square, to: Square } | null {
  // For each piece, check all possible moves
  const color = isWhiteTurn ? 'white' : 'black';
  const opponentColor = isWhiteTurn ? 'black' : 'white';
  let bestMove: { from: Square, to: Square } | null = null;
  
  // First priority: checkmate
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const square = { row, col };
        const moves = getPossibleMoves(board, square, isWhiteTurn);
        
        for (const move of moves) {
          const newBoard = movePiece(board, square, move);
          if (isMate(newBoard, opponentColor)) {
            return { from: square, to: move };
          }
        }
      }
    }
  }
  
  // Second priority: check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const square = { row, col };
        const moves = getPossibleMoves(board, square, isWhiteTurn);
        
        for (const move of moves) {
          const newBoard = movePiece(board, square, move);
          if (isCheck(newBoard, opponentColor)) {
            bestMove = { from: square, to: move };
          }
        }
      }
    }
  }
  
  if (bestMove) return bestMove;
  
  // Third priority: capture highest value piece
  const pieceValues: Record<ChessPieceType, number> = {
    'pawn': 1,
    'knight': 3,
    'bishop': 3,
    'rook': 5,
    'queen': 9,
    'king': 0 // We can't capture the king
  };
  
  let bestCaptureValue = -1;
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const square = { row, col };
        const moves = getPossibleMoves(board, square, isWhiteTurn);
        
        for (const move of moves) {
          const targetPiece = board[move.row][move.col];
          if (targetPiece && targetPiece.color !== color) {
            const captureValue = pieceValues[targetPiece.type];
            if (captureValue > bestCaptureValue) {
              bestCaptureValue = captureValue;
              bestMove = { from: square, to: move };
            }
          }
        }
      }
    }
  }
  
  if (bestMove) return bestMove;
  
  // Finally, just return any legal move
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const square = { row, col };
        const moves = getPossibleMoves(board, square, isWhiteTurn);
        
        if (moves.length > 0) {
          return { from: square, to: moves[0] };
        }
      }
    }
  }
  
  return null;
}

export function isValidMove(board: Board, from: Square, to: Square, isWhiteTurn: boolean): boolean {
  const piece = board[from.row][from.col];
  if (!piece) return false;
  
  if ((piece.color === 'white' && !isWhiteTurn) || (piece.color === 'black' && isWhiteTurn)) {
    return false;
  }
  
  const possibleMoves = getPossibleMoves(board, from, isWhiteTurn);
  return possibleMoves.some(move => move.row === to.row && move.col === to.col);
}