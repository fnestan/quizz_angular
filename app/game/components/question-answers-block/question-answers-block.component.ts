import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AnswerLetterTagComponent} from "../answer-letter-tag/answer-letter-tag.component";
import {AnswerAnimateDirective} from "../../directives/answer-animate.directive";
import {Answer, QuestionWSMessage} from "../../../shared/types/game.types";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RxStompService} from "../../../shared/services/rxstomp/rxstomp.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {GameService} from "../../../services/game/game.service";
import {Subject, filter, take, tap, takeUntil} from "rxjs";

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
export class QuestionAnswersBlockComponent implements OnInit, OnDestroy {
  question!: QuestionWSMessage;
  questionCountdown!: number;
  questionCountdownInterval!: number;

  letters = ['A', 'B', 'C', 'D'];

  hasAnswered = false;
  correctAnswer!: Answer | undefined;
  wrongAnswer!: Answer | undefined;

  onDestroy$ = new Subject<void>();

  // gérer le décompte
  // gérer l'affichage du score et joueur
 // gérer nombre de questions

  constructor(private rxStompService: RxStompService,
              private createGameService: CreateGameService,
              private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getQuestion$()
      .pipe(
        filter((question): question is QuestionWSMessage => !!question),
        tap(question => this.question = question),
        takeUntil(this.onDestroy$)
      ).subscribe(question => {
        clearInterval(this.questionCountdownInterval);
        this.hasAnswered = false;
        this.correctAnswer = undefined;
        this.wrongAnswer = undefined;
        this.questionCountdown = question?.time;
        this.updateCountdown();
    });
  }

  updateCountdown(): void {
    this.questionCountdownInterval = setInterval(() => {
      this.questionCountdown--;

      if (this.questionCountdown === 0) {
        this.gameService.answerQuestion({
          questionId: this.question.question.id,
          answerId: 0,
          gameId: this.createGameService._gameProperties$.value?.gameId as string,
          teamId: this.createGameService._gameProperties$.value?.teamId as number,
          timeToAnswer: 0
        })
      }
    }, 1000);
  }

  answerQuestion(answerId: number): void {
    this.hasAnswered = true;

    this.correctAnswer = this.question.question.answers.find(answer => answer.correct) as Answer;
    this.wrongAnswer = this.question.question.answers.find(answer => answer.id === answerId && !answer.correct);
    // mauvaise réponse
    // bonne réponse
    // faire l'appel

    this.gameService.answerQuestion({
      questionId: this.question.question.id,
      answerId: answerId,
      gameId: this.createGameService._gameProperties$.value?.gameId as string,
      teamId: this.createGameService._gameProperties$.value?.teamId as number,
      timeToAnswer: this.questionCountdown
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete();
  }
}
