import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const emailRegex = /^[\w\d_]+@[\w\d_]+\.\w{2,7}$/;
  const isValid = emailRegex.test(control.value);

  return isValid ? null : { invalidEmail: true };
};
