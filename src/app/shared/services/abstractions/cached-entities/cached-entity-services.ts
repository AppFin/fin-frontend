import { CachedEntityService } from './cached-entity.service';
import { InjectionToken } from '@angular/core';

export const CACHED_ENTITY_SERVICES = new InjectionToken<CachedEntityService<any>[]>(
  'Injection Token for CachedEntityService'
);