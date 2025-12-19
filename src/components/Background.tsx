import { motion } from 'framer-motion';
import type { Background as BackgroundType } from '../types';
import { BACKGROUND_COLORS, BACKGROUND_LABELS } from '../constants';

interface BackgroundProps {
  background: BackgroundType;
}

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
        backgroundColor: BACKGROUND_COLORS[background],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 플레이스홀더: 배경 이름 표시 */}
      {BACKGROUND_LABELS[background] && (
        <span
          style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '2rem',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          [{BACKGROUND_LABELS[background]}]
        </span>
      )}
    </motion.div>
  );
}
