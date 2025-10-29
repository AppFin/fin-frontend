import { DestroyRef, inject, Injectable } from '@angular/core';
import { AuthService } from './core/services/authentication/auth.service';
import { CACHED_ENTITY_SERVICES } from './shared/services/abstractions/cached-entities/cached-entity-services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class AppService {
  private readonly cachedServices = inject(CACHED_ENTITY_SERVICES);
  private readonly authService = inject(AuthService);

  private loadedCache = false;

  public async startUseCaches(destroyRef: DestroyRef): Promise<void> {
    const logged = this.authService.isAuthenticated;
    if (logged) await this.loadCaches();
    this.authService.isAuthenticatedSub
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(authenticated => {
        if (authenticated && this.loadedCache) this.loadCaches();
        else this.invalidateCaches();
      });
  }

  private async loadCaches(): Promise<void> {
    const promises = this.cachedServices.map(async (service) => {
      await service.loadCache();
    });
    this.loadedCache = true;
    await Promise.all(promises);
  }

  private invalidateCaches(): void {
    this.cachedServices.map(service => {
      service.invalidateCache();
    });
    this.loadedCache = false;
  }
}
