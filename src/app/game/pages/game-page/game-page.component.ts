import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserScoreBarComponent} from "../../components/user-score-bar/user-score-bar.component";
import {QuestionAnswersBlockComponent} from "../../components/question-answers-block/question-answers-block.component";
import {FooterBarComponent} from "../../components/footer-bar/footer-bar.component";
import {RxStompService} from "../../../shared/services/rxstomp/rxstomp.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {filter, first, Subject, takeUntil, tap} from 'rxjs';
import {GameProperties, QuestionWSMessage} from "../../../shared/types/game.types";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  standalone: true,
  imports: [
    UserScoreBarComponent,
    QuestionAnswersBlockComponent,
    FooterBarComponent
  ]
})
export class GamePageComponent implements OnInit, OnDestroy {
  question!: string;
  gameId!: string;

  onDestroy$ = new Subject<void>();

  constructor(private rxStompService: RxStompService,
              private createGameService: CreateGameService) {
  }

  ngOnInit(): void {
    this.createGameService.gameProperties$.pipe(
      first(),
      filter((gameProperties): gameProperties is GameProperties => !!gameProperties),
      tap(gameProperties => {
        this.gameId = gameProperties.gameId;
        this.rxStompService.publish({
          destination: '/app/start',
          body: this.gameId
        });
      }),
      takeUntil(this.onDestroy$)
    )
      .subscribe(message => {
        this.watchForQuestion(this.gameId);
      });

    this.rxStompService.connectionState$.subscribe(console.log)
  }

  watchForQuestion(gameId: string): void {
    this.rxStompService.watch({
      destination: `/socket/${gameId}`,
    }).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(message => {
      console.log(message.body);
      this.question = message.body;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete();
  }
}
