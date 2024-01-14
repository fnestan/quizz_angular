export interface QuestionWSMessage {
  question: Question;
  type: string;
  time: number;
}

export interface Question {
  id: number;
  label: string;
  difficulty: string;
  blind: boolean;
  theme: Theme;
  answers: Answer[];
}

export interface Answer {
  id: number;
  label: string;
  correct: boolean;
}

export interface Theme {
  id: number;
  label: string;
  active: boolean;
}

export interface GameProperties {
  gameId: string;
  playerName: string;
  teamId: number;
}

export interface AnswerQuestionWSRequest {
  questionId: number;
  answerId: number;
  gameId: string;
  teamId: number;
  timeToAnswer: number;
}
