import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTodos } from './form-todos';

describe('FormTodos', () => {
  let component: FormTodos;
  let fixture: ComponentFixture<FormTodos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTodos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTodos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
