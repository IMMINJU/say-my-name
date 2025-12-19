export type Character = 'walter' | 'jesse' | 'tuco' | null;

export type Expression =
  | 'default'
  | 'worried'
  | 'determined'
  | 'angry'
  | 'hollow'
  | 'bloody'
  | 'mocking'
  | 'shocked'
  | 'respect'
  | 'crying';

export type Background =
  | 'walter_home'
  | 'walter_home_night'
  | 'bedroom'
  | 'garage'
  | 'car_interior'
  | 'tuco_building_exterior'
  | 'tuco_office'
  | 'tuco_office_destroyed'
  | 'alley'
  | 'hospital'
  | 'black';

export type Effect = 'shake' | 'flash' | 'fadeIn' | 'fadeOut' | 'none';

export type CutScene = 'fulminate' | 'explosion' | 'heisenberg' | 'study';

export interface DialogueNode {
  type: 'dialogue';
  id: string;
  character: Character;
  expression?: Expression;
  text: string;
  innerThought?: boolean;
  next: string | null;
}

export interface ChoiceOption {
  text: string;
  next: string;
  setFlag?: string;
  requireFlag?: string;
  hidden?: boolean;
}

export interface ChoiceNode {
  type: 'choice';
  id: string;
  choices: ChoiceOption[];
  timer?: number; // 초 단위 타이머 (없으면 무제한)
  timeoutChoice?: number; // 타임아웃 시 선택될 인덱스
}

export interface SceneNode {
  type: 'scene';
  id: string;
  background?: Background;
  effect?: Effect;
  cutscene?: CutScene;
  next: string;
}

export interface EndingNode {
  type: 'ending';
  id: string;
  endingId: string;
  title: string;
  subtitle: string;
}

export type ScriptNode = DialogueNode | ChoiceNode | SceneNode | EndingNode;

export interface GameScript {
  [key: string]: ScriptNode;
}
