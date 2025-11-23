import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { SumError } from '../types/errors/sum-error';

type SumRangeValidatorError = ValidationErrors & {
  sumTooLow?: SumError | undefined;
  sumTooHigh?: SumError | undefined;
};

/**
 * Validator to check if the sum of values is within the allowed range
 * @param fieldName - Name of the field to be summed
 * @param min - Minimum allowed value (optional)
 * @param max - Maximum allowed value (optional)
 * @param markControls - If true, marks individual controls with error when range is exceeded (default: false)
 * @returns ValidatorFn that validates the FormArray
 *
 * @example
 * // Apply to FormArray with control marking
 * new FormArray([], [sumRangeValidator('percentage', 0, 100, true)])
 *
 * // Without marking individual controls
 * new FormArray([], [sumRangeValidator('percentage', 0, 100)])
 *
 * @example
 * // Error structure returned
 * {
 *   sumTooLow: { sum: 50, min: 100, message: "..." },
 *   sumTooHigh: { sum: 150, max: 100, message: "..." }
 * }
 */
export function sumRangeValidator(
  fieldName: string,
  min?: number,
  max?: number,
  markControls: boolean = false
): ValidatorFn {
  return (control: AbstractControl): SumRangeValidatorError | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const sum = control.controls.reduce((total, group) => {
      const value = group.get(fieldName)?.value;
      return total + (Number(value) || 0);
    }, 0);

    const errors: SumRangeValidatorError = {};
    let hasError = false;

    if (min !== undefined && sum < min) {
      errors.sumTooLow = {
        sum,
        min,
        message: `finCore.errors.sumMustBeAtLeast|min:${min}|sum:${sum}`,
      };
      hasError = true;
    }

    if (max !== undefined && sum > max) {
      errors.sumTooHigh = {
        sum,
        max,
        message: `finCore.errors.sumExceed|max:${max}|sum:${sum}`,
      };
      hasError = true;
    }

    if (markControls) {
      control.controls.forEach((group) => {
        const fieldControl = group.get(fieldName);
        if (fieldControl) {
          const currentErrors = fieldControl.errors || {};

          if (hasError) {
            fieldControl.setErrors({ ...currentErrors, ...errors });
          } else {
            delete currentErrors['sumTooLow'];
            delete currentErrors['sumTooHigh'];
            fieldControl.setErrors(
              Object.keys(currentErrors).length ? currentErrors : null
            );
          }
        }
      });
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
