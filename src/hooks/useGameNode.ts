import { useCallback, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { script } from '../data/script';
import type { ChoiceOption, ScriptNode } from '../types';

export function useGameNode() {
  const {
    currentNodeId,
    setNode,
    setFlag,
    hasFlag,
    setBackground,
    setCharacter,
    setEffect,
    setCutscene,
    setEnding,
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
  const handleNext = useCallback(() => {
    if (currentNode?.type === 'dialogue' && currentNode.next) {
      setNode(currentNode.next);
    }
  }, [currentNode, setNode]);

  // 선택지 선택
  const handleChoice = useCallback((choice: ChoiceOption) => {
    if (choice.setFlag) {
      setFlag(choice.setFlag);
    }
    setNode(choice.next);
  }, [setFlag, setNode]);

  // 컷씬 닫기
  const handleCloseCutscene = useCallback(() => {
    setShowCutscene(false);
    setCutscene(null);
    if (currentNode?.type === 'scene') {
      setNode(currentNode.next);
    }
  }, [currentNode, setCutscene, setNode]);

  // 이펙트 완료
  const handleEffectComplete = useCallback(() => {
    setEffect('none');
    if (currentNode?.type === 'scene' && !currentNode.cutscene) {
      setNode(currentNode.next);
    }
  }, [currentNode, setEffect, setNode]);

  // 화면 클릭
  const handleScreenClick = useCallback(() => {
    if (currentNode?.type === 'dialogue' && currentNode.next) {
      setNode(currentNode.next);
    }
  }, [currentNode, setNode]);

  return {
    currentNode,
    showCutscene,
    hasFlag,
    handleNext,
    handleChoice,
    handleCloseCutscene,
    handleEffectComplete,
    handleScreenClick,
  };
}
