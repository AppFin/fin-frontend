import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PrimeCustomPreset } from '../styles/prime-custom-present';
import { providePrimeNG } from 'primeng/config';

import { TranslateFakeLoader, TranslateLoader, TranslateModule, } from '@ngx-translate/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { finAppInitializer } from './core/functions/app-initializer';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),
    provideAnimationsAsync(),
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
    provideAppInitializer(finAppInitializer),
  ],
};
