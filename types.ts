export enum Complex {
  C1 = '1단지',
  C2 = '2단지'
}

export enum PropertyType {
  T34A = '34A타입',
  T34B = '34B타입',
  T34C = '34C타입',
  T34D = '34D타입',
  T41 = '41타입'
}

export enum PhotoZone {
  LIVING = '거실',
  KITCHEN = '주방',
  MASTER = '안방',
  BED1 = '작은방1',
  BED2 = '작은방2',
  BED3 = '작은방3',
  BED4 = '작은방4',
  BATH_L = '욕실(거실)',
  BATH_M = '욕실(안방)',
  DRESS = '드레스룸',
  OPTION = '옵션',
  PANTRY = '펜트리',
  ALPHA = '알파룸',
  POWDER = '파우더룸',
  LAUNDRY = '세탁실',
  VERANDA = '배란다',
  EXT1 = '외부뷰1',
  EXT2 = '외부뷰2',
  EXT3 = '외부뷰3',
  FLOOR_PLAN = '평면도',
  STRUCTURE = '구조도',
  LAYOUT = '배치도',
  COMMUNITY = '커뮤니티',
  VIEW = '단지뷰',
  OTHER = '기타'
}

export enum VideoCategory {
  C1 = '1단지',
  C2 = '2단지',
  INDOOR = '실내',
  OUTDOOR = '외부',
  COMMUNITY = '커뮤니티',
  ENV = '주변'
}

export interface PropertyImage {
  id: string;
  complex: Complex;
  type: PropertyType;
  zone: PhotoZone;
  imageUrl: string;
  createdAt: string;
}

export interface PropertyVideo {
  id: string;
  category: VideoCategory;
  title: string;
  youtubeId: string;
}

export type ViewState = 'GALLERY' | 'VIDEO' | 'ADMIN';