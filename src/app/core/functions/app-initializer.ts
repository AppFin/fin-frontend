import { inject } from '@angular/core';
import { FinTranslateService } from '../services/translate/fin-translate.service';
import { MenuService } from '../services/layout/menu.service';

export const finAppInitializer = () => {
  const translateService = inject(FinTranslateService);
  const menuService = inject(MenuService);
  translateService.loadTranslations();
  menuService.startLoadMenuMetadataSub();
};
