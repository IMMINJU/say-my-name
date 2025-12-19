import { motion } from 'framer-motion';

interface EndingScreenProps {
  title: string;
  subtitle: string;
  onRestart: () => void;
}

export function EndingScreen({ title, subtitle, onRestart }: EndingScreenProps) {
  const isBadEnd = title.includes('BAD');
  const isGagEnd = title.includes('GAG');
  const isTrueEnd = title.includes('TRUE');

  const getBgColor = () => {
    if (isBadEnd) return '#1a0a0a';
    if (isGagEnd) return '#0a1a0a';
    if (isTrueEnd) return '#0a0a1a';
    return '#1a1a1a';
  };

  const getAccentColor = () => {
    if (isBadEnd) return '#ff4444';
    if (isGagEnd) return '#44ff44';
    if (isTrueEnd) return '#4444ff';
    return '#ffcc00';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: getBgColor(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 300,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: getAccentColor(),
            fontSize: '1rem',
            letterSpacing: '0.3em',
            marginBottom: '16px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}
        >
          "{subtitle}"
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        style={{
          marginTop: '60px',
          padding: '16px 32px',
          backgroundColor: 'transparent',
          border: `1px solid ${getAccentColor()}`,
          borderRadius: '8px',
          color: getAccentColor(),
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        처음부터 다시
      </motion.button>
    </motion.div>
  );
}
