import { motion } from 'framer-motion';

interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 400,
      }}
    >
      {/* 타이틀 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#00ff00',
            fontSize: '0.9rem',
            letterSpacing: '0.5em',
            marginBottom: '8px',
          }}
        >
          BREAKING BAD
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
          }}
        >
          Say My Name
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            marginTop: '16px',
          }}
        >
          비주얼노벨
        </div>
      </motion.div>

      {/* 시작 버튼 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ scale: 1.05, borderColor: '#00ff00' }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        style={{
          marginTop: '80px',
          padding: '16px 48px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '1.1rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        게임 시작
      </motion.button>

      {/* 크레딧 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          color: 'white',
          fontSize: '0.8rem',
        }}
      >
        용기사07 스타일 팬게임
      </motion.div>
    </motion.div>
  );
}
