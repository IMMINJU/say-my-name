import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { useGameNode } from '../hooks';
import { Background } from './Background';
import { CharacterSprite } from './CharacterSprite';
import { DialogueBox } from './DialogueBox';
import { ChoiceMenu } from './ChoiceMenu';
import { CutScene } from './CutScene';
import { Effects } from './Effects';
import { EndingScreen } from './EndingScreen';
import { TitleScreen } from './TitleScreen';

export function Game() {
  const {
    isStarted,
    currentBackground,
    currentCharacter,
    currentExpression,
    currentEffect,
    currentCutscene,
    currentEnding,
    startGame,
    resetGame,
  } = useGameStore();

  const {
    currentNode,
    showCutscene,
    hasFlag,
    handleNext,
    handleChoice,
    handleCloseCutscene,
    handleEffectComplete,
    handleScreenClick,
  } = useGameNode();

  // 타이틀 화면
  if (!isStarted) {
    return <TitleScreen onStart={startGame} />;
  }

  // 엔딩 화면
  if (currentEnding) {
    return (
      <EndingScreen
        title={currentEnding.title}
        subtitle={currentEnding.subtitle}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div
      onClick={handleScreenClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#000',
        cursor: currentNode?.type === 'dialogue' ? 'pointer' : 'default',
      }}
    >
      {/* 배경 */}
      <Background background={currentBackground} />

      {/* 캐릭터 */}
      {currentNode?.type === 'dialogue' && currentCharacter && (
        <CharacterSprite
          character={currentCharacter}
          expression={currentExpression}
        />
      )}

      {/* 대사창 */}
      {currentNode?.type === 'dialogue' && (
        <DialogueBox
          character={currentNode.character}
          text={currentNode.text}
          innerThought={currentNode.innerThought}
          onNext={handleNext}
        />
      )}

      {/* 선택지 */}
      {currentNode?.type === 'choice' && (
        <ChoiceMenu
          choices={currentNode.choices}
          onSelect={handleChoice}
          hasFlag={hasFlag}
        />
      )}

      {/* 컷씬 */}
      <AnimatePresence>
        {showCutscene && currentCutscene && (
          <CutScene cutscene={currentCutscene} onClose={handleCloseCutscene} />
        )}
      </AnimatePresence>

      {/* 이펙트 */}
      <Effects effect={currentEffect} onComplete={handleEffectComplete} />
    </div>
  );
}
