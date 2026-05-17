import { FormControl } from '@angular/forms';
import { SupportedLocalizations } from '../../core/constants/localizations/supported-localizations';

export type UpdateUserForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  displayName: FormControl<string | null>;
  imagePublicUrl: FormControl<string | null>;
  locale: FormControl<SupportedLocalizations>;
};
