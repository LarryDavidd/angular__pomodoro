import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password: string = control.value;

  if (password && password.length < 8) {
    return { minlength: true };
  }

  return null;
};
