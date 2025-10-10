import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Generic validator that checks if the field value is in a list of values already in use
 * @param getNamesInUse Function that returns the array of names already in use
 * @param caseSensitive Whether the comparison should be case-sensitive (default: false)
 * @returns ValidatorFn
 */
export function nameAlreadyInUseValidator(
  getNamesInUse: () => string[],
  caseSensitive: boolean = false
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const namesInUse = getNamesInUse();
    const value = caseSensitive
      ? control.value
      : control.value.toLowerCase();

    const isInUse = namesInUse.some(name => {
      const compareName = caseSensitive ? name : name.toLowerCase();
      return compareName === value;
    });

    return isInUse ? { nameAlreadyInUse: { value: control.value, namesInUse } } : null;
  };
}