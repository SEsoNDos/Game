import { Move } from '../types/chess';

export function getChessMoveNotation(move: Move): string {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  const fromFile = files[move.from.col];
  const fromRank = ranks[move.from.row];
  const toFile = files[move.to.col];
  const toRank = ranks[move.to.row];
  
  const pieceSymbols: Record<string, string> = {
    'king': 'K',
    'queen': 'Q',
    'rook': 'R',
    'bishop': 'B',
    'knight': 'N',
    'pawn': '',
  };
  
  const piece = pieceSymbols[move.piece.type];
  const capture = move.capturedPiece ? 'x' : '';
  
  return `${piece}${fromFile}${fromRank}${capture}${toFile}${toRank}`;
}