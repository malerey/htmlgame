import { ComponentType } from 'react';

export interface Question {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  highlightElement: string;
  choices: Choice[];
  correctAnswer: string;
  explanation: string;
}

export interface Choice {
  id: string;
  label: string;
  code: string;
}

export interface GameState {
  currentLevelId: string | null;
  currentQuestionIndex: number;
  score: number;
  answers: Answer[];
  isComplete: boolean;
  showExplanation: boolean;
  selectedAnswer: string | null;
  isAnswered: boolean;
}

export interface Answer {
  questionId: string;
  selectedChoice: string;
  isCorrect: boolean;
}

export interface DesignElement {
  id: string;
  name: string;
  styles: Record<string, string>;
}

export interface DesignCanvasProps {
  highlightedElement: string | null;
  hoveredElement: string | null;
  onElementHover: (id: string, e: React.MouseEvent) => void;
  onElementLeave: () => void;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  questions: Question[];
  designElements: DesignElement[];
  DesignComponent: ComponentType<DesignCanvasProps>;
}
