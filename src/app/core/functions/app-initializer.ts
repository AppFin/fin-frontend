import { inject } from '@angular/core';
import { filter, firstValueFrom } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';
import { MenuService } from '../services/layout/menu.service';
import { LocalizationService } from '../services/localization/localization.service';
import { TenantApiService } from '../services/tenants/tenant-api.service';
import { FinTranslateService } from '../services/translate/fin-translate.service';

export const finAppInitializer = async () => {
  const translateService = inject(FinTranslateService);
  const menuService = inject(MenuService);
  const localizationService = inject(LocalizationService);
  const tenantApiService = inject(TenantApiService);
  const authService = inject(AuthService);

  await loadUserLang(tenantApiService, authService, localizationService);

  localizationService.registerLocalization();
  translateService.loadTranslations();
  menuService.startLoadMenuMetadataSub();
};

const loadUserLang = async (
  tenantApiService: TenantApiService,
  authService: AuthService,
  localizationService: LocalizationService
) => {
  const authStated = authService.authStarted;
  if (!authStated) {
    const observable = authService.authStartedSub.pipe(
      filter((started) => started)
    );
    await firstValueFrom(observable);
  }
  if (authService.isAuthenticated) {
    const tenantId = authService.currentUser()?.tenantId;
    if (!!tenantId) {
      const tenant = await firstValueFrom(tenantApiService.get(tenantId));
      localizationService.setUserLang(tenant.locale);
    }
  }
};
