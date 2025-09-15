import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingIcon } from './settings-icon';

describe('SettingIcon', () => {
  let component: SettingIcon;
  let fixture: ComponentFixture<SettingIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
