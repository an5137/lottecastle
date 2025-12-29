
import React, { useState } from 'react';
import { PropertyVideo, VideoCategory } from '../types';

interface VideoSectionProps {
  videos: PropertyVideo[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredVideos = videos.filter(v => filter === 'ALL' || v.category === filter);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'ALL' ? 'bg-[#8c734b] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          전체
        </button>
        {Object.values(VideoCategory).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat ? 'bg-[#8c734b] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map(video => (
          <div key={video.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="w-full h-full border-0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-bold text-[#8c734b] uppercase tracking-widest mb-2 block">
                {video.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#8c734b] transition-colors">
                {video.title}
              </h3>
            </div>
          </div>
        ))}

        {filteredVideos.length === 0 && (
           <div className="col-span-full py-20 text-center text-gray-400">
             해당 카테고리의 영상이 없습니다.
           </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
