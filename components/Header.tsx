import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('GALLERY')}>
          <div className="w-10 h-10 bg-[#8c734b] flex items-center justify-center rounded-sm">
            <span className="text-white font-display text-xl">L</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#222]">창원사화 롯데캐슬 포레스트</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#8c734b] font-medium italic">Premium Image Archive</p>
          </div>
        </div>

        <nav className="flex items-center bg-gray-50 p-1 rounded-xl">
          <button
            onClick={() => onViewChange('GALLERY')}
            className={`px-4 py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              currentView === 'GALLERY' 
              ? 'bg-white text-[#8c734b] shadow-sm' 
              : 'text-gray-400 hover:text-gray-800'
            }`}
          >
            Gallery / 갤러리
          </button>
          <button
            onClick={() => onViewChange('VIDEO')}
            className={`px-4 py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              currentView === 'VIDEO' 
              ? 'bg-white text-[#8c734b] shadow-sm' 
              : 'text-gray-400 hover:text-gray-800'
            }`}
          >
            Video / 영상
          </button>
          <button
            onClick={() => onViewChange('ADMIN')}
            className={`px-4 py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${
              currentView === 'ADMIN' 
              ? 'bg-white text-[#8c734b] shadow-sm' 
              : 'text-gray-400 hover:text-gray-800'
            }`}
          >
            Admin / 관리자
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;