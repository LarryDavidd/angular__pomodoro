import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortModal } from './sort-modal';

describe('SortModal', () => {
  let component: SortModal;
  let fixture: ComponentFixture<SortModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
