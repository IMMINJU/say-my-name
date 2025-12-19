import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { script } from '../data/script';
import { Background } from './Background';
import { CharacterSprite } from './CharacterSprite';
import { DialogueBox } from './DialogueBox';
import { ChoiceMenu } from './ChoiceMenu';
import { CutScene } from './CutScene';
import { Effects } from './Effects';
import { EndingScreen } from './EndingScreen';
import { TitleScreen } from './TitleScreen';
import type { ChoiceOption, ScriptNode } from '../types';

export function Game() {
  const {
    currentNodeId,
    isStarted,
    currentBackground,
    currentCharacter,
    currentExpression,
    currentEffect,
    currentCutscene,
    currentEnding,
    setNode,
    setFlag,
    hasFlag,
    setBackground,
    setCharacter,
    setEffect,
    setCutscene,
    setEnding,
    startGame,
    resetGame,
  } = useGameStore();

  const [showCutscene, setShowCutscene] = useState(false);

  const currentNode: ScriptNode | undefined = script[currentNodeId];

  // 노드 처리
  const processNode = useCallback((node: ScriptNode) => {
    switch (node.type) {
      case 'dialogue':
        if (node.character) {
          setCharacter(node.character, node.expression || 'default');
        }
        break;

      case 'scene':
        if (node.background) {
          setBackground(node.background);
        }
        if (node.effect && node.effect !== 'none') {
          setEffect(node.effect);
        }
        if (node.cutscene) {
          setCutscene(node.cutscene);
          setShowCutscene(true);
        } else {
          // 컷씬 없으면 바로 다음으로
          if (!node.effect || node.effect === 'none') {
            setNode(node.next);
          }
        }
        break;

      case 'ending':
        setEnding({ title: node.title, subtitle: node.subtitle });
        break;

      case 'choice':
        // 선택지는 별도 처리 없음
        break;
    }
  }, [setCharacter, setBackground, setEffect, setCutscene, setNode, setEnding]);

  // 노드 변경 시 처리
  useEffect(() => {
    if (currentNode) {
      processNode(currentNode);
    }
  }, [currentNodeId, currentNode, processNode]);

  // 다음 대사로 이동
  const handleNext = () => {
    if (currentNode?.type === 'dialogue' && currentNode.next) {
      setNode(currentNode.next);
    }
  };

  // 선택지 선택
  const handleChoice = (choice: ChoiceOption) => {
    if (choice.setFlag) {
      setFlag(choice.setFlag);
    }
    setNode(choice.next);
  };

  // 컷씬 닫기
  const handleCloseCutscene = () => {
    setShowCutscene(false);
    setCutscene(null);
    if (currentNode?.type === 'scene') {
      setNode(currentNode.next);
    }
  };

  // 이펙트 완료
  const handleEffectComplete = () => {
    setEffect('none');
    if (currentNode?.type === 'scene' && !currentNode.cutscene) {
      setNode(currentNode.next);
    }
  };

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

  // 화면 아무데나 클릭하면 다음 대사로
  const handleScreenClick = () => {
    if (currentNode?.type === 'dialogue' && currentNode.next) {
      setNode(currentNode.next);
    }
  };

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
