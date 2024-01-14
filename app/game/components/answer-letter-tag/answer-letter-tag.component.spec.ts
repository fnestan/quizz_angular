import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerLetterTagComponent } from './answer-letter-tag.component';

describe('AnswerLetterTagComponent', () => {
  let component: AnswerLetterTagComponent;
  let fixture: ComponentFixture<AnswerLetterTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerLetterTagComponent]
    });
    fixture = TestBed.createComponent(AnswerLetterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
