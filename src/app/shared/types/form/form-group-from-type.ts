import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

type FormGroupFromTypeInput<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export class FormGroupFromType<T> extends FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}> {
  constructor(
    controls: FormGroupFromTypeInput<T>,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
