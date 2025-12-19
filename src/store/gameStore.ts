import { create } from 'zustand';
import type { Character, Expression, Background, Effect, CutScene } from '../types';

interface GameState {
  // 진행 상태
  currentNodeId: string;
  flags: Set<string>;
  isStarted: boolean;

  // 표시 상태
  currentBackground: Background;
  currentCharacter: Character;
  currentExpression: Expression;
  currentEffect: Effect;
  currentCutscene: CutScene | null;

  // 엔딩
  currentEnding: { title: string; subtitle: string } | null;

  // 액션
  setNode: (id: string) => void;
  setFlag: (flag: string) => void;
  hasFlag: (flag: string) => boolean;
  setBackground: (bg: Background) => void;
  setCharacter: (char: Character, expr?: Expression) => void;
  setEffect: (effect: Effect) => void;
  setCutscene: (cg: CutScene | null) => void;
  setEnding: (ending: { title: string; subtitle: string } | null) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // 초기 상태
  currentNodeId: 'start',
  flags: new Set(),
  isStarted: false,

  currentBackground: 'black',
  currentCharacter: null,
  currentExpression: 'default',
  currentEffect: 'none',
  currentCutscene: null,
  currentEnding: null,

  // 액션
  setNode: (id) => set({ currentNodeId: id }),

  setFlag: (flag) => set((state) => {
    const newFlags = new Set(state.flags);
    newFlags.add(flag);
    return { flags: newFlags };
  }),

  hasFlag: (flag) => get().flags.has(flag),

  setBackground: (bg) => set({ currentBackground: bg }),

  setCharacter: (char, expr = 'default') => set({
    currentCharacter: char,
    currentExpression: expr
  }),

  setEffect: (effect) => set({ currentEffect: effect }),

  setCutscene: (cg) => set({ currentCutscene: cg }),

  setEnding: (ending) => set({ currentEnding: ending }),

  startGame: () => set({ isStarted: true }),

  resetGame: () => set({
    currentNodeId: 'start',
    flags: new Set(),
    isStarted: false,
    currentBackground: 'black',
    currentCharacter: null,
    currentExpression: 'default',
    currentEffect: 'none',
    currentCutscene: null,
    currentEnding: null,
  }),
}));
