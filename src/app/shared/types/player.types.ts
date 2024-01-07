export interface CreatePlayerRequest {
  name: string;
}

export interface CreatePlayerResponse {
  id: number;
  name: string;
  score: number;
}
