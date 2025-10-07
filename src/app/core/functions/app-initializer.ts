import { inject } from '@angular/core';
import { FinTranslateService } from '../services/translate/fin-translate.service';
import { MenuService } from '../services/layout/menu.service';
import { LocalizationService } from '../services/localization/localization.service';

export const finAppInitializer = () => {
  const translateService = inject(FinTranslateService);
  const menuService = inject(MenuService);
  const localizationService = inject(LocalizationService);
  localizationService.registerLocalization();
  translateService.loadTranslations();
  menuService.startLoadMenuMetadataSub();
};
