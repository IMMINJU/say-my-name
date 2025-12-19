import { motion } from 'framer-motion';
import type { Background as BackgroundType } from '../types';

interface BackgroundProps {
  background: BackgroundType;
}

const backgroundColors: Record<BackgroundType, string> = {
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

const backgroundLabels: Record<BackgroundType, string> = {
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

export function Background({ background }: BackgroundProps) {
  return (
    <motion.div
      key={background}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: backgroundColors[background],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 플레이스홀더: 배경 이름 표시 */}
      {backgroundLabels[background] && (
        <span
          style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '2rem',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          [{backgroundLabels[background]}]
        </span>
      )}
    </motion.div>
  );
}
