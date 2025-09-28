import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomatoIcon } from './tomato-icon';

describe('TomatoIcon', () => {
  let component: TomatoIcon;
  let fixture: ComponentFixture<TomatoIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TomatoIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomatoIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
