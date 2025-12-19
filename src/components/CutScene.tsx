import { motion } from 'framer-motion';
import type { CutScene as CutSceneType } from '../types';
import { CUTSCENE_LABELS, CUTSCENE_COLORS } from '../constants';

interface CutSceneProps {
  cutscene: CutSceneType;
  onClose: () => void;
}

export function CutScene({ cutscene, onClose }: CutSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: CUTSCENE_COLORS[cutscene],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
      }}
    >
      {/* 플레이스홀더: 컷씬 설명 */}
      <div
        style={{
          padding: '40px',
          border: '2px dashed rgba(255,255,255,0.3)',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '1rem',
            marginBottom: '16px',
          }}
        >
          [CG 이미지]
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {CUTSCENE_LABELS[cutscene]}
        </div>
      </div>

      {/* 클릭 안내 */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '40px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.9rem',
        }}
      >
        클릭하여 계속
      </motion.div>
    </motion.div>
  );
}
