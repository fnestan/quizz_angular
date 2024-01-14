import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RxStompService} from "../../../shared/services/rxstomp/rxstomp.service";
import {filter, map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-countdown-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown-page.component.html',
  styleUrls: ['./countdown-page.component.scss']
})
export class CountdownPageComponent implements OnInit, OnDestroy {
  countdown!: number;
  gameId!: string;

  onDestroy$ = new Subject<void>();

  constructor(private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter(params => params['gameId']),
      tap(params => this.gameId = params['gameId']),
      tap(params => this.rxStompService.publish({
        destination: '/app/start',
        body: params['gameId']
      })),
      switchMap(params => this.rxStompService.watch({ destination: `/socket/countdown/${this.gameId}` })),
      tap(message => {
        console.log(message)
        this.countdown = parseInt(message.body);
        if (this.countdown === 0) {
          void this.router.navigate(['/', 'jouer', this.gameId])
        }
      }),
      takeUntil(this.onDestroy$)
    ).subscribe()
  }

  ngOnDestroy(): void  {
    this.onDestroy$.next()
    this.onDestroy$.complete();
  }
}
