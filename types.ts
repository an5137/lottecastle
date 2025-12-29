export enum Complex {
  C1 = 'Complex 1 / 1단지',
  C2 = 'Complex 2 / 2단지'
}

export enum PropertyType {
  T34A = 'Type 34A / 34A타입',
  T34B = 'Type 34B / 34B타입',
  T34C = 'Type 34C / 34C타입',
  T34D = 'Type 34D / 34D타입',
  T41 = 'Type 41 / 41타입'
}

export enum PhotoZone {
  LIVING = 'Living Room / 거실',
  KITCHEN = 'Kitchen / 주방',
  MASTER = 'Master Bedroom / 안방',
  BED1 = 'Bedroom 1 / 작은방1',
  BED2 = 'Bedroom 2 / 작은방2',
  BED3 = 'Bedroom 3 / 작은방3',
  BED4 = 'Bedroom 4 / 작은방4',
  BATH_L = 'Main Bathroom / 욕실(거실)',
  BATH_M = 'Master Bathroom / 욕실(안방)',
  DRESS = 'Dress Room / 드레스룸',
  OPTION = 'Options / 옵션',
  PANTRY = 'Pantry / 펜트리',
  ALPHA = 'Alpha Room / 알파룸',
  POWDER = 'Powder Room / 파우더룸',
  LAUNDRY = 'Laundry Room / 세탁실',
  VERANDA = 'Veranda / 배란다',
  EXT1 = 'Exterior View 1 / 외부뷰1',
  EXT2 = 'Exterior View 2 / 외부뷰2',
  EXT3 = 'Exterior View 3 / 외부뷰3',
  FLOOR_PLAN = 'Floor Plan / 평면도',
  STRUCTURE = 'Structure / 구조도',
  LAYOUT = 'Site Map / 배치도',
  COMMUNITY = 'Community / 커뮤니티',
  VIEW = 'Complex View / 단지뷰',
  OTHER = 'Others / 기타'
}

export enum VideoCategory {
  C1 = 'Complex 1 / 1단지',
  C2 = 'Complex 2 / 2단지',
  INDOOR = 'Indoor / 실내',
  OUTDOOR = 'Outdoor / 외부',
  COMMUNITY = 'Community / 커뮤니티',
  ENV = 'Environment / 주변'
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