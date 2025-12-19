import { motion } from 'framer-motion';
import type { Character } from '../types';
import { CHARACTER_NAMES } from '../constants';

interface DialogueBoxProps {
  character: Character;
  text: string;
  innerThought?: boolean;
  onNext: () => void;
}

export function DialogueBox({ character, text, innerThought, onNext }: DialogueBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onNext}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: innerThought ? 'rgba(0, 0, 50, 0.9)' : 'rgba(0, 0, 0, 0.85)',
        borderRadius: '8px',
        padding: '20px',
        cursor: 'pointer',
        border: innerThought ? '1px solid rgba(100, 100, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {/* 캐릭터 이름 */}
      {character && (
        <div
          style={{
            color: innerThought ? '#8888ff' : '#ffcc00',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >
          {CHARACTER_NAMES[character]}{innerThought ? ' (내면)' : ''}
        </div>
      )}

      {/* 대사 */}
      <div
        style={{
          color: innerThought ? '#aaaaff' : '#ffffff',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          fontStyle: innerThought ? 'italic' : 'normal',
        }}
      >
        {text}
      </div>

      {/* 다음 표시 */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '15px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.8rem',
        }}
      >
        ▼
      </motion.div>
    </motion.div>
  );
}
