import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-answer-letter-tag',
  templateUrl: './answer-letter-tag.component.html',
  styleUrls: ['./answer-letter-tag.component.scss'],
  standalone: true
})
export class AnswerLetterTagComponent {
  @Input() letter!: string;
}
