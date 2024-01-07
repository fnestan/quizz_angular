import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../../../environments/environment";
import {
  AbstractControl,
  FormArray,
  FormControl, FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {filter, Observable, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {CreateGameService} from "../../../services/create-game/create-game.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.scss']
})
export class CreateGamePageComponent implements OnInit, OnDestroy {

  modes!: any[];
  modeFormControl = new FormControl<number | null>(null, [Validators.required]);
  typeFormControl = new FormControl<number | null>(null, [Validators.required]);
  gameParametersFormGroup!: FormGroup;
  playerFormControl = new FormControl<string | null>(null, [Validators.required]);

  typesOfSelectedMode!: any[];
  parametersOfSelectedType!: any[];

  gameId!: string;

  onDestroy$ = new Subject<void>();

  constructor(private createGameService: CreateGameService,
              private router: Router) {}

  ngOnInit() {
    this.createGameService.getGameModes().subscribe(modes =>
      this.modes = modes
    );

    this.modeFormControl.valueChanges
      .pipe(
        filter((selectedMode): selectedMode is number => !!selectedMode)
      )
      .subscribe((selectedMode) =>
      this.typesOfSelectedMode = this.modes.find(mode => mode.id == selectedMode).types
    )

    this.typeFormControl.valueChanges
      .pipe(filter((selectedType): selectedType is number => !!selectedType))
      .subscribe((selectedType) => {
      this.parametersOfSelectedType = this.typesOfSelectedMode.find(type => type.id == selectedType).parameters;
      this.gameParametersFormGroup = new FormGroup({});
      this.parametersOfSelectedType.forEach(parameter => {
        this.gameParametersFormGroup.addControl(parameter.code, new FormControl<string | null>(null, [Validators.required]));
      });
    })
  }

  getGameParameterFormControl(parameterName: string): FormControl {
    return this.gameParametersFormGroup.get([parameterName]) as FormControl;
  }

  createGame(): void {
    const createGameRequest = {
      type: {
        id: Number(this.typeFormControl.value),
      },
      parameters: Object.entries(this.gameParametersFormGroup.controls).map(([key, control]) => {
        return {
          parameterCode: key,
          parameterAnswer: control.value
        }
      })
    };

    this.createGameService.createGame(createGameRequest).pipe(
      tap(apiResponse => this.gameId = apiResponse.response),
      switchMap(apiResponse =>
        this.createGameService.createPlayer(apiResponse.response, {
          name: this.playerFormControl.value as string
        }).pipe(
          tap(player =>
            this.createGameService._gameProperties$.next({
              gameId: this.gameId,
              playerName: player.name,
              teamId: player.id
            })
          )
        )
      ),
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      void this.router.navigate(['/', 'jouer', this.gameId]);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
