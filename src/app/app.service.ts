import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { AuthService } from './core/services/authentication/auth.service';
import { CACHED_ENTITY_SERVICES } from './shared/services/abstractions/cached-entities/cached-entity-services';

@Injectable()
export class AppService {
  private readonly cachedServices = inject(CACHED_ENTITY_SERVICES);
  private readonly authService = inject(AuthService);

  private loadedCache = false;

  public async startAppAsync(destroyRef: DestroyRef): Promise<void> {
    const authStated = this.authService.authStarted;
    if (!authStated) {
      const observable = this.authService.authStartedSub.pipe(filter(started => started))
      await firstValueFrom(observable);
    }
    await this.startUseCaches(destroyRef);
    this.removeSplashScreen();
  }

  private removeSplashScreen(): void {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.remove();
    }
  }

  private async startUseCaches(destroyRef: DestroyRef): Promise<void> {
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
