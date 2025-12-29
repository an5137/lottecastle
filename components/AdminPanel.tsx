import React, { useState } from 'react';
import { PropertyImage, PropertyVideo, Complex, PropertyType, PhotoZone, VideoCategory } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AdminPanelProps {
  images: PropertyImage[];
  setImages: React.Dispatch<React.SetStateAction<PropertyImage[]>>;
  videos: PropertyVideo[];
  setVideos: React.Dispatch<React.SetStateAction<PropertyVideo[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ images, setImages, videos, setVideos }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const [newImage, setNewImage] = useState({
    complex: Complex.C1,
    type: PropertyType.T34A,
    zone: PhotoZone.LIVING,
    imageUrl: ''
  });

  const [newVideo, setNewVideo] = useState({
    category: VideoCategory.C1,
    title: '',
    youtubeId: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setIsAuthorized(true);
    else alert('비밀번호가 틀립니다. (기본: 1234)');
  };

  const addImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.imageUrl) return;
    const img: PropertyImage = {
      id: `img_${Date.now()}`,
      ...newImage,
      createdAt: new Date().toISOString()
    };
    setImages(prev => [img, ...prev]);
    setNewImage({ ...newImage, imageUrl: '' });
  };

  const addVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.youtubeId || !newVideo.title) return;
    const vid: PropertyVideo = {
      id: `vid_${Date.now()}`,
      ...newVideo
    };
    setVideos(prev => [vid, ...prev]);
    setNewVideo({ ...newVideo, title: '', youtubeId: '' });
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-40 animate-slideUp">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 luxury-shadow">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-[#8c734b] rounded-3xl flex items-center justify-center mx-auto mb-8 text-white text-4xl font-display rotate-3">L</div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">ADMIN PANEL</h2>
            <p className="text-[11px] text-[#8c734b] mt-3 uppercase tracking-[0.3em] font-bold">Secure Verification</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSCODE"
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#8c734b] focus:bg-white transition-all text-center tracking-[0.5em] font-bold text-lg"
            />
            <button type="submit" className="w-full py-5 bg-[#8c734b] text-white font-bold rounded-2xl hover:bg-[#6e5a3b] shadow-xl shadow-[#8c734b]/20 transition-all active:scale-95 uppercase tracking-widest text-sm">
              Verify Identity
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-24 animate-fadeIn pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="text-4xl font-bold font-display italic">Dashboard Manager</h2>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-[#8c734b]/5 rounded-2xl border border-[#8c734b]/10 text-[#8c734b]">
            <span className="text-[10px] font-black uppercase block tracking-widest">Images</span>
            <span className="text-xl font-bold">{images.length}</span>
          </div>
          <div className="px-6 py-3 bg-[#8c734b]/5 rounded-2xl border border-[#8c734b]/10 text-[#8c734b]">
            <span className="text-[10px] font-black uppercase block tracking-widest">Videos</span>
            <span className="text-xl font-bold">{videos.length}</span>
          </div>
        </div>
      </div>

      {/* Photo Management Section */}
      <section className="space-y-10">
        <div className="border-l-4 border-[#8c734b] pl-6">
          <h3 className="text-2xl font-bold text-gray-900">Photo Inventory</h3>
          <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">Upload and manage visual assets</p>
        </div>
        
        <form onSubmit={addImage} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 luxury-shadow">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complex</label>
            <select className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" value={newImage.complex} onChange={e => setNewImage({...newImage, complex: e.target.value as Complex})}>
              {Object.values(Complex).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
            <select className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" value={newImage.type} onChange={e => setNewImage({...newImage, type: e.target.value as PropertyType})}>
              {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zone</label>
            <select className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" value={newImage.zone} onChange={e => setNewImage({...newImage, zone: e.target.value as PhotoZone})}>
              {Object.values(PhotoZone).map(z => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
            <input className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" placeholder="https://..." value={newImage.imageUrl} onChange={e => setNewImage({...newImage, imageUrl: e.target.value})} required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-[#8c734b] transition-all shadow-lg active:scale-[0.98]">REGISTER</button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-md bg-white">
              <img src={img.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-[#8c734b]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                <p className="text-[10px] text-white/60 font-black uppercase mb-1 tracking-widest">{img.type}</p>
                <p className="text-white font-bold text-lg mb-4">{img.zone}</p>
                <button onClick={() => setImages(prev => prev.filter(i => i.id !== img.id))} className="bg-white/20 text-white p-4 rounded-full hover:bg-white hover:text-red-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Management Section */}
      <section className="space-y-10">
        <div className="border-l-4 border-[#8c734b] pl-6">
          <h3 className="text-2xl font-bold text-gray-900">Visual Archives</h3>
          <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">Manage YouTube integration</p>
        </div>

        <form onSubmit={addVideo} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 luxury-shadow">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
            <select className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" value={newVideo.category} onChange={e => setNewVideo({...newVideo, category: e.target.value as VideoCategory})}>
              {Object.values(VideoCategory).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video Title</label>
            <input className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" placeholder="Title" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} required />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">YouTube ID</label>
            <input className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#8c734b]" placeholder="ID Only" value={newVideo.youtubeId} onChange={e => setNewVideo({...newVideo, youtubeId: e.target.value})} required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-[#8c734b] transition-all shadow-lg">ARCHIVE</button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map(v => (
            <div key={v.id} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all group luxury-shadow">
              <div className="flex gap-6 items-center">
                 <div className="w-16 h-12 bg-[#ff0000]/5 rounded-xl flex items-center justify-center text-[10px] font-black text-[#ff0000] tracking-tighter">LIVE</div>
                 <div>
                   <h4 className="font-bold text-gray-900 group-hover:text-[#8c734b] transition-colors line-clamp-1">{v.title}</h4>
                   <div className="flex gap-3 items-center mt-2">
                     <span className="text-[10px] px-3 py-1 bg-gray-100 rounded-full text-gray-500 font-bold uppercase tracking-widest">{v.category}</span>
                     <span className="text-[10px] text-gray-300 font-mono">{v.youtubeId}</span>
                   </div>
                 </div>
              </div>
              <button onClick={() => setVideos(prev => prev.filter(x => x.id !== v.id))} className="text-gray-200 hover:text-red-500 p-3 transition-colors">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;