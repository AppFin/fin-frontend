import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
import { PlatformDetectionService } from '../services/app/platform-detection.service';
import { AppVersionService } from '../services/app/app-version.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const finRequest = req.url.includes(environment.apiUrl);
  if (!finRequest) return next(req);

  const platformService = inject(PlatformDetectionService);
  const versionService = inject(AppVersionService);

  const platformInfo = platformService.getPlatformInfo();
  const appVersion = versionService.getVersion();

  const customHeaders = {
    'X-App-Version': appVersion,
    'X-OS-Name': platformInfo.osName,
    'X-OS-Version': platformInfo.osVersion,
    'X-Browser-Name': platformInfo.browserName,
    'X-Browser-Version': platformInfo.browserVersion,
  };

  const modifiedReq = req.clone({
    setHeaders: customHeaders,
  });

  return next(modifiedReq);
};
