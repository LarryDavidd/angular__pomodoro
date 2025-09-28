import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSettingsModal } from './todo-settings-modal';

describe('TodoSettingsModal', () => {
  let component: TodoSettingsModal;
  let fixture: ComponentFixture<TodoSettingsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoSettingsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoSettingsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
