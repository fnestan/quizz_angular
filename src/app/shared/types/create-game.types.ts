export interface GameMode {
  id: number;
  label: string;
  multi: boolean;
  types: GameType[];
}

export interface GameType {
  id: number;
  label: string;
  dscription: string;
  parameters: GameParameter[];
}

export interface GameParameter {
  id: number;
  label: string;
  code: string;
  possibleResponse: string[];
}

export interface CreateGameRequest {
  type: {
    id: number;
  },
  parameters: {
    parameterCode: string;
    parameterAnswer: string;
  }[];
}
