import { Component } from '@angular/core';
import {AnswerLetterTagComponent} from "../answer-letter-tag/answer-letter-tag.component";
import {AnswerAnimateDirective} from "../../directives/answer-animate.directive";

@Component({
  selector: 'app-question-answers-block',
  templateUrl: './question-answers-block.component.html',
  styleUrls: ['./question-answers-block.component.scss'],
  imports: [
    AnswerLetterTagComponent,
    AnswerAnimateDirective
  ],
  standalone: true
})
export class QuestionAnswersBlockComponent {

}
