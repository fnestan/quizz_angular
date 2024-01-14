import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserScoreBarComponent} from "../../components/user-score-bar/user-score-bar.component";
import {QuestionAnswersBlockComponent} from "../../components/question-answers-block/question-answers-block.component";
import {FooterBarComponent} from "../../components/footer-bar/footer-bar.component";
import {RxStompService} from "../../../shared/services/rxstomp/rxstomp.service";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import {filter, first, map, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {GameProperties, QuestionWSMessage} from "../../../shared/types/game.types";
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../../services/game/game.service";

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
  question!: QuestionWSMessage;
  gameId!: string;

  onDestroy$ = new Subject<void>();

  constructor(private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute,
              private gameService: GameService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter(params => params['gameId']),
      tap(params => {
        this.gameId = params['gameId'];
      }),
      tap(params => this.rxStompService.publish({
        destination: '/app/start',
        body: params['gameId']
      })),
      switchMap(params =>
        this.rxStompService.watch({ destination: `/socket/${this.gameId}` })
      ),
      tap(message => {
        if (JSON.parse(message.body).message === 'ENDGAME') {
          return;
        }

        this.gameService.setQuestion(JSON.parse(message.body));
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete();
  }
}
