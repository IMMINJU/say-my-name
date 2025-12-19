import { motion } from 'framer-motion';
import type { Effect } from '../types';

interface EffectsProps {
  effect: Effect;
  onComplete: () => void;
}

export function Effects({ effect, onComplete }: EffectsProps) {
  if (effect === 'none') return null;

  const effectVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, onComplete },
    },
    flash: {
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.3, times: [0, 0.1, 0.5, 1], onComplete },
    },
    fadeIn: {
      opacity: [1, 0],
      transition: { duration: 0.5, onComplete },
    },
    fadeOut: {
      opacity: [0, 1],
      transition: { duration: 0.5, onComplete },
    },
  };

  const effectStyles: Record<Effect, React.CSSProperties> = {
    none: {},
    shake: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
    },
    flash: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'white',
      pointerEvents: 'none',
      zIndex: 200,
    },
    fadeIn: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'black',
      pointerEvents: 'none',
      zIndex: 200,
    },
    fadeOut: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'black',
      pointerEvents: 'none',
      zIndex: 200,
    },
  };

  return (
    <motion.div
      key={`effect-${effect}-${Date.now()}`}
      animate={effectVariants[effect]}
      style={effectStyles[effect]}
    />
  );
}
