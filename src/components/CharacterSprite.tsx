import { motion } from 'framer-motion';
import type { Character, Expression } from '../types';

interface CharacterSpriteProps {
  character: Character;
  expression: Expression;
}

const characterNames: Record<NonNullable<Character>, string> = {
  walter: '월터',
  jesse: '제시',
  tuco: '투코',
};

const characterColors: Record<NonNullable<Character>, string> = {
  walter: '#4a7c59',
  jesse: '#7c4a4a',
  tuco: '#7c6a4a',
};

const expressionEmoji: Record<Expression, string> = {
  default: '😐',
  worried: '😟',
  determined: '😤',
  angry: '😠',
  hollow: '😔',
  bloody: '🤕',
  mocking: '😏',
  shocked: '😨',
  respect: '🤝',
  crying: '😢',
};

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
          backgroundColor: characterColors[character],
          borderRadius: '150px 150px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{ fontSize: '5rem' }}>{expressionEmoji[expression]}</span>
        <span
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          {characterNames[character]}
        </span>
      </div>
    </motion.div>
  );
}
