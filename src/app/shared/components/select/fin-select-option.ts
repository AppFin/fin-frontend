export class FinSelectOption<T = null> {
  label: string;
  disabled?: boolean;
  value: any;
  customValue?: T;
}

export class FinSelectOptionWithTranslation<T = null> {
  label: string;
  labelTranslated: string;
  disabled?: boolean;
  value: any;
  customValue?: T;
}