import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AnswerLetterTagComponent} from "../answer-letter-tag/answer-letter-tag.component";
import {AnswerAnimateDirective} from "../../directives/answer-animate.directive";
import {Answer, QuestionWSMessage} from "../../../shared/types/game.types";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RxStompService} from "../../../shared/services/rxstomp/rxstomp.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";

@Component({
  selector: 'app-question-answers-block',
  templateUrl: './question-answers-block.component.html',
  styleUrls: ['./question-answers-block.component.scss'],
  imports: [
    AnswerLetterTagComponent,
    AnswerAnimateDirective,
    NgForOf,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class QuestionAnswersBlockComponent {
  private _question!: QuestionWSMessage;

  @Input()
  set question(question: string) {
    if (question !== 'ENDGAME') {
      this._question = JSON.parse(question) as QuestionWSMessage;
    }
  }

  get question(): QuestionWSMessage {
    return this._question;
  }

  questionCountdown!: number;
  questionCountdownInterval!: number;

  letters = ['A', 'B', 'C', 'D'];

  hasAnswered = false;
  correctAnswer!: Answer | undefined;
  wrongAnswer!: Answer | undefined;

  // gérer le décompte
  // gérer l'affichage du score et joueur
 // gérer nombre de questions

  constructor(private rxStompService: RxStompService,
              private createGameService: CreateGameService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'].currentValue) {
      clearInterval(this.questionCountdownInterval);
      this.hasAnswered = false;
      this.correctAnswer = undefined;
      this.wrongAnswer = undefined;
      this.questionCountdown = +changes['question'].currentValue.time;
      this.updateCountdown();
    }
  }

  updateCountdown(): void {
    this.questionCountdownInterval = setInterval(() => {
      this.questionCountdown--;

      if (this.questionCountdown === 0) {
            this.rxStompService.publish({
              destination: '/app/answer',
              body: JSON.stringify({
                questionId: this.question.question.id,
                answerId: 0,
                gameId: this.createGameService._gameProperties$.value?.gameId,
                teamId: this.createGameService._gameProperties$.value?.teamId,
                timeToAnswer: 0
              })
            });
      }
    }, 1000);
  }

  answerQuestion(answerId: number): void {
    this.hasAnswered = true;

    this.correctAnswer = this.question.question.answers.find(answer => answer.correct) as Answer;
    // mauvaise réponse
    // bonne réponse
    // faire l'appel

    this.rxStompService.publish({
      destination: '/app/answer',
      body: JSON.stringify({
        questionId: this.question.question.id,
        answerId: answerId,
        gameId: this.createGameService._gameProperties$.value?.gameId,
        teamId: this.createGameService._gameProperties$.value?.teamId,
        timeToAnswer: this.questionCountdown
      })
    });
  }
}
