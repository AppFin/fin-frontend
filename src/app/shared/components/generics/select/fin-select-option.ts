export class FinSelectOption<T = any, C = null> {
  label: string;
  disabled?: boolean;
  value: T;
  customValue?: C;
}

export class FinSelectOptionWithTranslation<T = any, C = null> {
  label: string;
  labelTranslated: string;
  disabled?: boolean;
  value: T;
  customValue?: C;
}