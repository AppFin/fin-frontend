import { Provider } from '@angular/core';
import { CACHED_ENTITY_SERVICES } from './cached-entity-services';
import { FinancialInstitutionApiService } from '../../financial-institutions/financial-institution-api.service';
import { CardBrandApiService } from '../../../../core/services/card-brand/card-brand-api.service';

export function provideCachedEntityServices(): Provider[] {
  return [
    {
      provide: CACHED_ENTITY_SERVICES,
      multi: true,
      useExisting: FinancialInstitutionApiService
    },
    {
      provide: CACHED_ENTITY_SERVICES,
      multi: true,
      useExisting: CardBrandApiService
    }
  ];
}