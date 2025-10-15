import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PrimeCustomPreset } from '../styles/prime-custom-present';
import { providePrimeNG } from 'primeng/config';

import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { finAppInitializer } from './core/functions/app-initializer';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { appInterceptor } from './core/interceptors/app.interceptor';
import { provideToastr } from 'ngx-toastr';
import { localeIdFactory } from './core/functions/locale-factory';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideCachedEntityServices } from './shared/services/abstractions/cached-entities/provide-cached-entity-services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, appInterceptor, errorInterceptor])
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    provideEnvironmentNgxMask(),
    providePrimeNG({
      theme: {
        preset: PrimeCustomPreset,
        options: {
          darkModeSelector: '.dark-theme',
        },
      },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader,
        },
      })
    ),
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory,
    },
    provideCachedEntityServices(),
    provideAppInitializer(finAppInitializer),
  ],
};
