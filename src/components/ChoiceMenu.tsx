import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ChoiceOption } from '../types';

interface ChoiceMenuProps {
  choices: ChoiceOption[];
  onSelect: (choice: ChoiceOption) => void;
  hasFlag: (flag: string) => boolean;
  timer?: number;
  timeoutChoice?: number;
}

export function ChoiceMenu({
  choices,
  onSelect,
  hasFlag,
  timer,
  timeoutChoice
}: ChoiceMenuProps) {
  const [timeLeft, setTimeLeft] = useState(timer ?? null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [forcedChoiceIndex, setForcedChoiceIndex] = useState<number | null>(null);

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

  // 타이머 카운트다운
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isTimedOut) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isTimedOut]);

  // 타임아웃 처리
  useEffect(() => {
    if (timeLeft === 0 && !isTimedOut && timeoutChoice !== undefined) {
      setIsTimedOut(true);
      setForcedChoiceIndex(timeoutChoice);

      // 0.5초 후 자동 선택
      setTimeout(() => {
        const choice = visibleChoices[timeoutChoice];
        if (choice) {
          onSelect(choice);
        }
      }, 500);
    }
  }, [timeLeft, isTimedOut, timeoutChoice, visibleChoices, onSelect]);

  const handleSelect = useCallback((choice: ChoiceOption) => {
    if (isTimedOut) return;
    onSelect(choice);
  }, [isTimedOut, onSelect]);

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
      {/* 타이머 바 */}
      {timer && timeLeft !== null && (
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}>
          <motion.div
            initial={{ width: '100%' }}
            animate={{
              width: '0%',
              backgroundColor: ['#ffcc00', '#ffcc00', '#ff4444'],
            }}
            transition={{
              width: { duration: timer, ease: 'linear' },
              backgroundColor: { duration: timer, times: [0, 0.6, 1] },
            }}
            style={{ height: '100%', borderRadius: '4px' }}
          />
        </div>
      )}

      {/* 선택지 */}
      {visibleChoices.map((choice, index) => {
        const isForced = forcedChoiceIndex === index;

        return (
          <motion.button
            key={choice.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: isForced ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.85)',
              borderColor: isForced ? '#ff4444' : 'rgba(255, 204, 0, 0.5)',
            }}
            transition={{ duration: isForced ? 0.1 : 0.3, delay: isForced ? 0 : index * 0.1 }}
            whileHover={!isTimedOut ? { scale: 1.02, backgroundColor: 'rgba(255, 204, 0, 0.2)' } : {}}
            whileTap={!isTimedOut ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(choice)}
            disabled={isTimedOut}
            style={{
              padding: '16px 24px',
              backgroundColor: 'rgba(0,0,0,0.85)',
              border: '1px solid rgba(255,204,0,0.5)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              textAlign: 'left',
              transition: 'all 0.2s',
              cursor: isTimedOut ? 'not-allowed' : 'pointer',
            }}
          >
            <span style={{ marginRight: '12px', color: isForced ? '#ff4444' : '#ffcc00' }}>
              {index + 1}.
            </span>
            {choice.text}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
