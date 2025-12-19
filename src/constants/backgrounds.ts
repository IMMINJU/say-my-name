import type { Background } from '../types';

export const BACKGROUND_COLORS: Record<Background, string> = {
  walter_home: '#2d2a26',
  walter_home_night: '#1a1815',
  bedroom: '#252230',
  garage: '#3d3a36',
  car_interior: '#1f1f1f',
  tuco_building_exterior: '#4a4035',
  tuco_office: '#4a3728',
  tuco_office_destroyed: '#2a1f18',
  alley: '#1a1a2e',
  hospital: '#e8e8e8',
  black: '#000000',
};

export const BACKGROUND_LABELS: Record<Background, string> = {
  walter_home: '월터의 집',
  walter_home_night: '월터의 집 (밤)',
  bedroom: '침실',
  garage: '차고',
  car_interior: '차 안',
  tuco_building_exterior: '투코 건물 앞',
  tuco_office: '투코의 사무실',
  tuco_office_destroyed: '파괴된 사무실',
  alley: '골목',
  hospital: '병원',
  black: '',
};
