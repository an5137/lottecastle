import React, { useState, useRef, useEffect } from 'react';
import { PropertyImage } from '../types';

interface CompareModalProps {
  imageA: PropertyImage;
  imageB: PropertyImage;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ imageA, imageB, onClose }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => isDragging && handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => isDragging && handleMove(e.touches[0].clientX);

  useEffect(() => {
    const stop = () => setIsDragging(false);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/98 backdrop-blur-xl p-4 md:p-12 animate-fadeIn">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 text-white/40 hover:text-white transition-all z-[110] hover:rotate-90"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <div className="w-full max-w-7xl h-full flex flex-col justify-center gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-white border-b border-white/10 pb-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold font-display italic tracking-tight">Image Contrast Analysis</h2>
            <p className="text-[#8c734b] text-sm font-bold tracking-[0.3em] uppercase">Lotte Castle Forest Premium</p>
          </div>
          
          <div className="flex gap-10">
            <div className="text-right">
              <span className="block text-[10px] text-[#8c734b] font-black tracking-widest uppercase mb-1">Before / A-Side</span>
              <span className="text-lg font-medium opacity-90">{imageA.zone} <span className="text-white/30 ml-2">| {imageA.type}</span></span>
            </div>
            <div className="text-left">
              <span className="block text-[10px] text-[#8c734b] font-black tracking-widest uppercase mb-1">After / B-Side</span>
              <span className="text-lg font-medium opacity-90">{imageB.zone} <span className="text-white/30 ml-2">| {imageB.type}</span></span>
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative flex-grow max-h-[70vh] w-full bg-[#111] overflow-hidden rounded-3xl cursor-ew-resize shadow-2xl group select-none ring-1 ring-white/10"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Right Image */}
          <img 
            src={imageB.imageUrl} 
            alt="Side B" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Left Image (Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img 
              src={imageA.imageUrl} 
              alt="Side A" 
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ width: `${containerRef.current?.offsetWidth}px`, maxWidth: 'none' }}
            />
          </div>

          {/* Slider Bar */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_30px_rgba(0,0,0,0.5)] z-30"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full slider-handle flex items-center justify-center transition-transform group-hover:scale-110">
              <svg className="w-8 h-8 text-[#8c734b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>
              </svg>
            </div>
          </div>

          {/* Info Overlays */}
          <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
            <span className="px-5 py-2.5 bg-black/60 backdrop-blur-xl text-white text-[11px] font-black tracking-[0.2em] rounded-full border border-white/20 uppercase shadow-xl">Option A: {imageA.complex}</span>
          </div>
          <div className="absolute bottom-10 right-10 z-20 pointer-events-none">
            <span className="px-5 py-2.5 bg-black/60 backdrop-blur-xl text-white text-[11px] font-black tracking-[0.2em] rounded-full border border-white/20 uppercase shadow-xl">Option B: {imageB.complex}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-px bg-white"></div>
          <p className="text-white text-[10px] font-bold tracking-[0.4em] uppercase">Slide to Explore Differences</p>
          <div className="w-12 h-px bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;