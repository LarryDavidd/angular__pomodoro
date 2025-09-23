import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoIncModal } from './todo-inc-modal';

describe('TodoIncModal', () => {
  let component: TodoIncModal;
  let fixture: ComponentFixture<TodoIncModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoIncModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoIncModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
