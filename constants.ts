import { Complex, PropertyType, PhotoZone, VideoCategory, PropertyImage, PropertyVideo } from './types';

export const INITIAL_IMAGES: PropertyImage[] = [
  {
    id: 'sample-1',
    complex: Complex.C1,
    type: PropertyType.T34A,
    zone: PhotoZone.LIVING,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-2',
    complex: Complex.C1,
    type: PropertyType.T34A,
    zone: PhotoZone.KITCHEN,
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-3',
    complex: Complex.C2,
    type: PropertyType.T41,
    zone: PhotoZone.LIVING,
    imageUrl: 'https://images.unsplash.com/photo-1600607687940-47a04b629753?auto=format&fit=crop&q=80&w=1200',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_VIDEOS: PropertyVideo[] = [
  {
    id: 'vid-1',
    category: VideoCategory.C1,
    title: '창원사화 롯데캐슬 1단지 입지 분석',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'vid-2',
    category: VideoCategory.INDOOR,
    title: '34A타입 실내 인테리어 리뷰',
    youtubeId: 'dQw4w9WgXcQ'
  }
];

export const CONTACT_INFO = {
  agent: "안정은 소장",
  office: "롯데부동산",
  regNo: "제 가4376-0158호",
  phone: "010-5137-3189"
};

export const ADMIN_PASSWORD = "1234";