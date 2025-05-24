import React from 'react';
import { ChessIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChessIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Chess Puzzle Master</h1>
        </div>
        <div className="text-sm text-gray-600">
          10 Levels of Chess Mastery
        </div>
      </div>
    </header>
  );
};

export default Header;