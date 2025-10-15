import { DestroyRef, inject, Injectable } from '@angular/core';
import { AuthService } from './core/services/authentication/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CACHED_ENTITY_SERVICES } from './shared/services/abstractions/cached-entities/cached-entity-services';

@Injectable()
export class AppService {
  private readonly authService = inject(AuthService);
  private readonly cachedServices = inject(CACHED_ENTITY_SERVICES);

  public onInit(destroyRef: DestroyRef): void {
    this.authService.isAuthenticatedSub
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(async (isAuthenticated) => {
        if (isAuthenticated) {
          const requests = this.cachedServices.map(async (service) => {
            await service.loadCache();
          });
          await Promise.all(requests);
        } else {
          this.cachedServices.forEach((service) => service.loadCache());
        }
      });
  }
}
