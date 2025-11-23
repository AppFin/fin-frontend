import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { DuplicatedError } from '../types/errors/duplicated-error';

type noDuplicatesValidatorError = ValidationErrors & {
  duplicate?: DuplicatedError | undefined;
};

/**
 * Validator to check for duplicate values in a specific field
 * @param fieldName - Name of the field to check for duplicates
 * @param caseSensitive - Whether comparison should be case-sensitive (default: false)
 * @param markControls - If true, marks duplicate controls with error (default: false)
 * @returns ValidatorFn that validates the FormArray
 *
 * @example
 * // Apply to FormArray with control marking
 * new FormArray([], [noDuplicatesValidator('personId', false, true)])
 *
 * // Case-sensitive comparison without marking controls
 * new FormArray([], [noDuplicatesValidator('email', true)])
 *
 * @example
 * // Error structure returned
 * {
 *   duplicates: {
 *     field: 'personId',
 *     duplicatedValues: ['123', '456'],
 *     indices: [0, 2, 3],
 *     message: "Duplicate values found: 123, 456"
 *   }
 * }
 */
export function noDuplicatesValidator(
  fieldName: string,
  caseSensitive: boolean = false,
  markControls: boolean = false
): ValidatorFn {
  return (control: AbstractControl): noDuplicatesValidatorError | null => {
    if (!(control instanceof FormArray)) {
      return null;
    }

    const valueMap = new Map<any, number[]>();

    control.controls.forEach((group, index) => {
      let value = group.get(fieldName)?.value;

      if (value === null || value === undefined || value === '') {
        return;
      }

      const compareValue =
        typeof value === 'string' && !caseSensitive
          ? value.toLowerCase().trim()
          : value;

      if (!valueMap.has(compareValue)) {
        valueMap.set(compareValue, []);
      }
      valueMap.get(compareValue)!.push(index);
    });

    const duplicates: any[] = [];
    const duplicateIndices: number[] = [];

    valueMap.forEach((indices, value) => {
      if (indices.length > 1) {
        duplicates.push(value);
        duplicateIndices.push(...indices);
      }
    });

    const duplicateError: DuplicatedError = {
      field: fieldName,
      duplicatedValues: duplicates,
      indices: duplicateIndices,
      message: `finCore.errors.duplicateValues|duplicateValues:${duplicates.join(', ')}`,
    };

    if (markControls) {
      control.controls.forEach((group, index) => {
        const fieldControl = group.get(fieldName);
        if (fieldControl) {
          const currentErrors = fieldControl.errors || {};

          if (duplicateIndices.includes(index)) {
            fieldControl.setErrors({
              ...currentErrors,
              duplicate: duplicateError,
            });
          } else {
            delete currentErrors['duplicate'];
            fieldControl.setErrors(
              Object.keys(currentErrors).length ? currentErrors : null
            );
          }
        }
      });
    }

    if (duplicates.length > 0) {
      return { duplicate: duplicateError };
    }

    return null;
  };
}
