
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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">단지 분류</label>
          <select 
            className="block w-40 bg-gray-50 border-0 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#8c734b]"
            value={filterComplex}
            onChange={(e) => setFilterComplex(e.target.value)}
          >
            <option value="ALL">전체 단지</option>
            {Object.values(Complex).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">타입 분류</label>
          <select 
            className="block w-40 bg-gray-50 border-0 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#8c734b]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">전체 타입</option>
            {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">포토존 분류</label>
          <select 
            className="block w-48 bg-gray-50 border-0 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#8c734b]"
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
          >
            <option value="ALL">전체 포토존</option>
            {Object.values(PhotoZone).map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        <div className="ml-auto">
          <button
            onClick={onCompare}
            disabled={!canCompare}
            className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
              canCompare 
              ? 'bg-[#8c734b] text-white shadow-lg hover:bg-[#6e5a3b] transform hover:-translate-y-0.5' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>비교하기</span>
            <span className="bg-black/10 px-2 py-0.5 rounded text-xs">{selectedIds.length}/2</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div 
              key={img.id}
              onClick={() => onSelect(img.id)}
              className={`group relative rounded-xl overflow-hidden cursor-pointer bg-white border-2 transition-all duration-300 ${
                selectedIds.includes(img.id) 
                ? 'border-[#8c734b] ring-4 ring-[#8c734b]/10' 
                : 'border-transparent hover:shadow-xl'
              }`}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={img.imageUrl} 
                  alt={img.zone} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    selectedIds.includes(img.id) ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-[#8c734b] text-[10px] font-bold rounded uppercase">
                    {img.complex}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900">{img.zone}</h4>
                <p className="text-sm text-gray-500">{img.type}</p>
              </div>

              {selectedIds.includes(img.id) && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#8c734b] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold">{selectedIds.indexOf(img.id) + 1}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <p className="text-gray-400 font-medium">선택한 조건의 사진이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
