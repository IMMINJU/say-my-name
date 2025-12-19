import { motion } from 'framer-motion';
import type { Character, Expression } from '../types';
import { CHARACTER_NAMES, CHARACTER_COLORS, EXPRESSION_EMOJI } from '../constants';

interface CharacterSpriteProps {
  character: Character;
  expression: Expression;
}

export function CharacterSprite({ character, expression }: CharacterSpriteProps) {
  if (!character) return null;

  return (
    <motion.div
      key={`${character}-${expression}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* 플레이스홀더: 캐릭터 상반신 (하반신은 화면 밖) */}
      <div
        style={{
          width: '300px',
          height: '350px',
          backgroundColor: CHARACTER_COLORS[character],
          borderRadius: '150px 150px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{ fontSize: '5rem' }}>{EXPRESSION_EMOJI[expression]}</span>
        <span
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {CHARACTER_NAMES[character]}
        </span>
      </div>
    </motion.div>
  );
}
