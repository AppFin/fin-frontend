import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('passwordConfirmation');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (confirmPasswordControl.value) {
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordsDoNotMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (errors) errors['passwordsDoNotMatch'] = undefined;
      confirmPasswordControl.setErrors(errors);
    }
  }

  return null;
};
