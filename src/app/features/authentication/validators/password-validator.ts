import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.value;

  if (!password) {
    return null;
  }

  const errors: ValidationErrors = {};

  if (password.length < 5) {
    errors['minLength'] = true;
  }
  if (!/[a-z]/.test(password)) {
    errors['hasLowercase'] = true;
  }
  if (!/[A-Z]/.test(password)) {
    errors['hasUppercase'] = true;
  }
  if (!/[0-9]/.test(password)) {
    errors['hasNumber'] = true;
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors['hasSpecial'] = true;
  }

  return Object.keys(errors).length ? errors : null;
};
