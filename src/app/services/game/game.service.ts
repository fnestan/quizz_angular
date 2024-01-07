import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {QuestionWSMessage} from "../../shared/types/game.types";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _guestion = new BehaviorSubject<QuestionWSMessage | null>(null);

  constructor() { }
}
