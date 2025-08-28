import { FormControl } from '@angular/forms';

export type UserCreateForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  displayName: FormControl<string | null>;
};
