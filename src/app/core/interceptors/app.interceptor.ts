import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppVersionService } from '../services/app/app-version.service';
import { PlatformDetectionService } from '../services/app/platform-detection.service';
import { LocalizationService } from '../services/localization/localization.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const finRequest = req.url.includes(environment.apiUrl);
  if (!finRequest) return next(req);

  const platformService = inject(PlatformDetectionService);
  const versionService = inject(AppVersionService);
  const localizationService = inject(LocalizationService);

  const platformInfo = platformService.getPlatformInfo();
  const appVersion = versionService.getVersion();

  const customHeaders = {
    'X-App-Version': appVersion,
    'X-OS-Name': platformInfo.osName,
    'X-OS-Version': platformInfo.osVersion,
    'X-Browser-Name': platformInfo.browserName,
    'X-Browser-Version': platformInfo.browserVersion,
    'Accept-Language': localizationService.getLang(),
  };

  const modifiedReq = req.clone({
    setHeaders: customHeaders,
  });

  return next(modifiedReq);
};
