import React, { useState } from 'react';
import { PropertyVideo, VideoCategory } from '../types';

interface VideoSectionProps {
  videos: PropertyVideo[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredVideos = videos.filter(v => filter === 'ALL' || v.category === filter);

  return (
    <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
            filter === 'ALL' 
            ? 'bg-[#8c734b] text-white shadow-xl shadow-[#8c734b]/20 scale-105' 
            : 'bg-white text-gray-400 border border-gray-100 hover:text-gray-800 luxury-shadow'
          }`}
        >
          All / 전체
        </button>
        {Object.values(VideoCategory).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
              filter === cat 
              ? 'bg-[#8c734b] text-white shadow-xl shadow-[#8c734b]/20 scale-105' 
              : 'bg-white text-gray-400 border border-gray-100 hover:text-gray-800 luxury-shadow'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredVideos.map(video => (
          <div key={video.id} className="group bg-white rounded-[2.5rem] overflow-hidden luxury-shadow border border-gray-100 transition-all hover:-translate-y-2">
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full border-0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8">
              <span className="text-[10px] font-black text-[#8c734b] uppercase tracking-[0.3em] mb-3 block">
                {video.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#8c734b] transition-colors line-clamp-2 leading-relaxed">
                {video.title}
              </h3>
            </div>
          </div>
        ))}

        {filteredVideos.length === 0 && (
           <div className="col-span-full py-40 text-center">
             <p className="text-gray-400 font-bold text-sm tracking-widest uppercase italic">No Archives Available / 영상 정보가 없습니다</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;