import type { Character, Expression } from '../types';

export const CHARACTER_NAMES: Record<NonNullable<Character>, string> = {
  walter: '월터',
  jesse: '제시',
  tuco: '투코',
};

export const CHARACTER_COLORS: Record<NonNullable<Character>, string> = {
  walter: '#4a7c59',
  jesse: '#7c4a4a',
  tuco: '#7c6a4a',
};

export const EXPRESSION_EMOJI: Record<Expression, string> = {
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
