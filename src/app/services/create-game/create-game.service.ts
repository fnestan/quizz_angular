import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, share, shareReplay, Subject} from "rxjs";
import {CreateGameRequest, GameMode} from "../../shared/types/create-game.types";
import {BASE_URL} from "../../../environments/environment";
import {APIResponse} from "../../shared/types/shared.types";
import {CreatePlayerRequest, CreatePlayerResponse} from "../../shared/types/player.types";
import {GameProperties} from "../../shared/types/game.types";

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  _gameProperties$ = new BehaviorSubject<GameProperties | null>(null);

  get gameProperties$(): Observable<GameProperties | null> {
    return this._gameProperties$.pipe(share());
  }

  constructor(private httpClient: HttpClient) {}

  getGameModes(): Observable<GameMode[]> {
    return this.httpClient.get<GameMode[]>(`${BASE_URL}/quizz/v1/game/mode`);
  }

  createGame(createGameRequest: CreateGameRequest): Observable<APIResponse> {
    return this.httpClient.post<APIResponse>(`${BASE_URL}/quizz/v1/game/new_game`, createGameRequest);
  }

  createPlayer(gameId: string, createPlayerRequest: CreatePlayerRequest): Observable<CreatePlayerResponse> {
    return this.httpClient.post<CreatePlayerResponse>(`${BASE_URL}/quizz/v1/player/new_player/${gameId}`, createPlayerRequest);
  }
}
