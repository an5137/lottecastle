import React, { useState, useMemo } from 'react';
import { PropertyImage, Complex, PropertyType, PhotoZone } from '../types';

interface GalleryProps {
  images: PropertyImage[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onCompare: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, selectedIds, onSelect, onCompare }) => {
  const [filterComplex, setFilterComplex] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterZone, setFilterZone] = useState<string>('ALL');

  const filteredImages = useMemo(() => {
    return images.filter(img => {
      const complexMatch = filterComplex === 'ALL' || img.complex === filterComplex;
      const typeMatch = filterType === 'ALL' || img.type === filterType;
      const zoneMatch = filterZone === 'ALL' || img.zone === filterZone;
      return complexMatch && typeMatch && zoneMatch;
    });
  }, [images, filterComplex, filterType, filterZone]);

  const canCompare = selectedIds.length === 2;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap gap-8 items-end luxury-shadow">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#8c734b] uppercase tracking-widest ml-1">Complex / 단지 분류</label>
          <select 
            className="block w-52 bg-gray-50 border-0 rounded-xl px-4 py-4 text-xs font-bold focus:ring-2 focus:ring-[#8c734b] transition-all"
            value={filterComplex}
            onChange={(e) => setFilterComplex(e.target.value)}
          >
            <option value="ALL">All Complexes / 전체 단지</option>
            {Object.values(Complex).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#8c734b] uppercase tracking-widest ml-1">Type / 타입 분류</label>
          <select 
            className="block w-52 bg-gray-50 border-0 rounded-xl px-4 py-4 text-xs font-bold focus:ring-2 focus:ring-[#8c734b] transition-all"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">All Types / 전체 타입</option>
            {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#8c734b] uppercase tracking-widest ml-1">Zone / 포토존 분류</label>
          <select 
            className="block w-64 bg-gray-50 border-0 rounded-xl px-4 py-4 text-xs font-bold focus:ring-2 focus:ring-[#8c734b] transition-all"
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
          >
            <option value="ALL">All Zones / 전체 포토존</option>
            {Object.values(PhotoZone).map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        <div className="ml-auto">
          <button
            onClick={onCompare}
            disabled={!canCompare}
            className={`px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${
              canCompare 
              ? 'bg-[#8c734b] text-white shadow-xl hover:bg-[#6e5a3b] transform hover:-translate-y-1' 
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <span>Compare / 비교하기</span>
            <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">{selectedIds.length}/2</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div 
              key={img.id}
              onClick={() => onSelect(img.id)}
              className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white border-2 transition-all duration-500 ${
                selectedIds.includes(img.id) 
                ? 'border-[#8c734b] ring-8 ring-[#8c734b]/5 shadow-2xl' 
                : 'border-transparent hover:shadow-2xl'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={img.imageUrl} 
                  alt={img.zone} 
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    selectedIds.includes(img.id) ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
              </div>
              
              <div className="p-6 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-gray-50 text-[#8c734b] text-[10px] font-black rounded-full uppercase tracking-tighter border border-[#8c734b]/10">
                    {img.complex.split(' / ')[0]}
                  </span>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{img.zone}</h4>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{img.type}</p>
              </div>

              {selectedIds.includes(img.id) && (
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#8c734b] text-white rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/50 backdrop-blur-sm">
                  <span className="text-sm font-black">{selectedIds.indexOf(img.id) + 1}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">No Visual Data Found / 검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;