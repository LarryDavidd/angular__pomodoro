import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const spaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isSpace = (control.value || '').trim().length === 0;

  return isSpace ? { hasSpace: true } : null;
};
