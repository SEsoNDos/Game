export type ChessPieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type ChessPieceColor = 'white' | 'black';

export interface ChessPiece {
  type: ChessPieceType;
  color: ChessPieceColor;
}

export interface Square {
  row: number;
  col: number;
}

export interface Move {
  piece: ChessPiece;
  from: Square;
  to: Square;
  capturedPiece: ChessPiece | null;
}

export type Board = (ChessPiece | null)[][];