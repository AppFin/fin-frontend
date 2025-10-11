import { Observable } from 'rxjs';

export class EditorSaveOptions<TInput> {
  public onSave?: (input: TInput) => Observable<void>;
  public successMessage?: string;
  public errorMessage?: string;

  constructor(options: Partial<EditorSaveOptions<TInput>> = {}) {
    Object.assign(this, options);
  }
}
