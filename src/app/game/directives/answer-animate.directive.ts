import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[animateOnClick]',
  standalone: true
})
export class AnswerAnimateDirective {

  @HostBinding('class') clicked = '';

  @HostListener('click')
  onMouseOver() {
    this.clicked = 'animated shakeX';
  }
}
