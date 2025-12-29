
import React, { useState, useEffect } from 'react';
import { ViewState, PropertyImage, PropertyVideo } from './types';
import { INITIAL_IMAGES, INITIAL_VIDEOS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';
import AdminPanel from './components/AdminPanel';
import CompareModal from './components/CompareModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('GALLERY');
  const [images, setImages] = useState<PropertyImage[]>(() => {
    const saved = localStorage.getItem('lotte_images');
    return saved ? JSON.parse(saved) : INITIAL_IMAGES;
  });
  const [videos, setVideos] = useState<PropertyVideo[]>(() => {
    const saved = localStorage.getItem('lotte_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('lotte_images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('lotte_videos', JSON.stringify(videos));
  }, [videos]);

  const handleImageSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const selectedImages = images.filter(img => selectedIds.includes(img.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === 'GALLERY' && (
          <Gallery 
            images={images} 
            selectedIds={selectedIds} 
            onSelect={handleImageSelect}
            onCompare={() => setIsCompareOpen(true)}
          />
        )}
        {currentView === 'VIDEO' && (
          <VideoSection videos={videos} />
        )}
        {currentView === 'ADMIN' && (
          <AdminPanel 
            images={images} 
            setImages={setImages} 
            videos={videos} 
            setVideos={setVideos} 
          />
        )}
      </main>

      <Footer />

      {isCompareOpen && selectedImages.length === 2 && (
        <CompareModal 
          imageA={selectedImages[0]} 
          imageB={selectedImages[1]} 
          onClose={() => setIsCompareOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
