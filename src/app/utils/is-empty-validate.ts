import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isEmptyValidate(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  // eslint-disable-next-line unicorn/no-null
  return !value || value.trim() === '' ? { isEmpty: true } : null;
}
