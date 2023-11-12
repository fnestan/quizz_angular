import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownPageComponent } from './countdown-page.component';

describe('CountdownPageComponent', () => {
  let component: CountdownPageComponent;
  let fixture: ComponentFixture<CountdownPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountdownPageComponent]
    });
    fixture = TestBed.createComponent(CountdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
