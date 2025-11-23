import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EnI18n } from '../../constants/i18n/en-i18n';
import { EsI18n } from '../../constants/i18n/es-i18n';
import { PtBrI18n } from '../../constants/i18n/pt-br-i18n';
import { LocalizationService } from '../localization/localization.service';

@Injectable({
  providedIn: 'root',
})
export class FinTranslateService {
  private readonly translateService = inject(TranslateService);
  private readonly localizationService = inject(LocalizationService);

  public loadTranslations(): void {
    this.translateService.setTranslation('pt-BR', PtBrI18n);
    this.translateService.setTranslation('en-US', EnI18n);
    this.translateService.setTranslation('es', EsI18n);

    this.setDefaultLanguage();
  }

  public translate(keyAndProps: string): string {
    if (!keyAndProps) return '';

    const [key, ...propPairs] = keyAndProps.split('|');
    const params =
      propPairs.length > 0
        ? propPairs.reduce((acc, pair) => {
            const [k, v] = pair.split(':');
            acc[k.trim()] = isNaN(+v) ? v.trim() : +v;
            return acc;
          }, {} as any)
        : {};
    return this.translateService.instant(key.trim(), params);
  }

  private setDefaultLanguage(): void {
    this.translateService.use(this.localizationService.getLang());
  }
}
