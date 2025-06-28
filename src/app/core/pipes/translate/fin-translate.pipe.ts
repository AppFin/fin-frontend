import { inject, Pipe, PipeTransform } from '@angular/core';
import { FinTranslateService } from '../../services/translate/fin-translate.service';

@Pipe({
  name: 'finTranslate',
  standalone: true,
  pure: true,
})
export class FinTranslatePipe implements PipeTransform {
  private readonly translateService = inject(FinTranslateService);

  public transform(keyAndProps: string): string {
    return this.translateService.translate(keyAndProps);
  }
}
