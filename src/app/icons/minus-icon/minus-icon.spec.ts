import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinusIcon } from './minus-icon';

describe('MinusIcon', () => {
  let component: MinusIcon;
  let fixture: ComponentFixture<MinusIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinusIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinusIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
