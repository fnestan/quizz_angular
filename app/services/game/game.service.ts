import {Injectable} from '@angular/core';

import {RxStompService} from "../../shared/services/rxstomp/rxstomp.service";
import {AnswerQuestionWSRequest, QuestionWSMessage} from "../../shared/types/game.types";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _question = new BehaviorSubject<QuestionWSMessage | null>(null);

  constructor(private rxStompService: RxStompService) {
  }

  getQuestion$(): Observable<QuestionWSMessage | null> {
    return this._question.asObservable()
  }

  setQuestion(questionWSMessage: QuestionWSMessage | null) {
    this._question.next(questionWSMessage);
  }

  answerQuestion(answerQuestionWSRequest: AnswerQuestionWSRequest) {
    this.rxStompService.publish({
      destination: '/app/answer',
      body: JSON.stringify({
        questionId: answerQuestionWSRequest.questionId,
        answerId: answerQuestionWSRequest.answerId,
        gameId: answerQuestionWSRequest.gameId,
        teamId: answerQuestionWSRequest.teamId,
        timeToAnswer: answerQuestionWSRequest.timeToAnswer
      })
    });
  }
}
