import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagIcon } from './flag-icon';

describe('FlagIcon', () => {
  let component: FlagIcon;
  let fixture: ComponentFixture<FlagIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
