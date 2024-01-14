import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserScoreBarComponent } from './user-score-bar.component';

describe('PlayersBarComponent', () => {
  let component: UserScoreBarComponent;
  let fixture: ComponentFixture<UserScoreBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserScoreBarComponent]
    });
    fixture = TestBed.createComponent(UserScoreBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
