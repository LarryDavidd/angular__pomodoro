import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroChangeValues } from './pomodoro-change-values';

describe('PomodoroChangeValues', () => {
  let component: PomodoroChangeValues;
  let fixture: ComponentFixture<PomodoroChangeValues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroChangeValues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomodoroChangeValues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
