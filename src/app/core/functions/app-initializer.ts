import { inject } from '@angular/core';
import { FinTranslateService } from '../services/translate/fin-translate.service';

export const finAppInitializer = () => {
  const translateService = inject(FinTranslateService);
  translateService.loadTranslations();
};
