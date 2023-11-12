import { Component } from '@angular/core';
import {UserScoreBarComponent} from "../../components/user-score-bar/user-score-bar.component";
import {QuestionAnswersBlockComponent} from "../../components/question-answers-block/question-answers-block.component";
import {FooterBarComponent} from "../../components/footer-bar/footer-bar.component";

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
export class GamePageComponent {

}
