import { ChessPiece } from '../types/chess';

export function getPieceImage(piece: ChessPiece): string {
  const pieceImages: Record<string, string> = {
    'white-pawn': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    'white-knight': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    'white-bishop': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    'white-rook': 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    'white-queen': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    'white-king': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    'black-pawn': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
    'black-knight': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    'black-bishop': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    'black-rook': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    'black-queen': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    'black-king': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
  };
  
  const key = `${piece.color}-${piece.type}`;
  return pieceImages[key];
}