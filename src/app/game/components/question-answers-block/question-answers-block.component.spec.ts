import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswersBlockComponent } from './question-answers-block.component';

describe('QuestionAnswersBlockComponent', () => {
  let component: QuestionAnswersBlockComponent;
  let fixture: ComponentFixture<QuestionAnswersBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnswersBlockComponent]
    });
    fixture = TestBed.createComponent(QuestionAnswersBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
