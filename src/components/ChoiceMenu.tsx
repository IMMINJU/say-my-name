import { motion } from 'framer-motion';
import type { ChoiceOption } from '../types';

interface ChoiceMenuProps {
  choices: ChoiceOption[];
  onSelect: (choice: ChoiceOption) => void;
  hasFlag: (flag: string) => boolean;
}

export function ChoiceMenu({ choices, onSelect, hasFlag }: ChoiceMenuProps) {
  // 표시할 선택지 필터링 (requireFlag 조건 확인)
  const visibleChoices = choices.filter((choice) => {
    if (choice.hidden && choice.requireFlag) {
      return hasFlag(choice.requireFlag);
    }
    if (choice.requireFlag && !choice.hidden) {
      return hasFlag(choice.requireFlag);
    }
    return !choice.hidden;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {visibleChoices.map((choice, index) => (
        <motion.button
          key={choice.text}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 204, 0, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(choice)}
          style={{
            padding: '16px 24px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            border: '1px solid rgba(255, 204, 0, 0.5)',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '1rem',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ color: '#ffcc00', marginRight: '12px' }}>
            {index + 1}.
          </span>
          {choice.text}
        </motion.button>
      ))}
    </motion.div>
  );
}
