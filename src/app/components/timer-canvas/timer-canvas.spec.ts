import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerCanvas } from './timer-canvas';

describe('TimerCanvas', () => {
  let component: TimerCanvas;
  let fixture: ComponentFixture<TimerCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerCanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerCanvas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
