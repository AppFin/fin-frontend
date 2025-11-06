import { Provider } from '@angular/core';
import { CardBrandApiService } from '../../../../core/services/card-brand/card-brand-api.service';
import { CreditCardService } from '../../credit-cards/credit-card.service';
import { FinancialInstitutionApiService } from '../../financial-institutions/financial-institution-api.service';
import { WalletService } from '../../wallets/wallet.service';
import { CACHED_ENTITY_SERVICES } from './cached-entity-services';
import { TitleCategoryApiService } from '../../title-categories/title-category-api.service';

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
    },
    {
      provide: CACHED_ENTITY_SERVICES,
      multi: true,
      useExisting: WalletService
    },
    {
      provide: CACHED_ENTITY_SERVICES,
      multi: true,
      useExisting: CreditCardService
    },
    {
      provide: CACHED_ENTITY_SERVICES,
      multi: true,
      useExisting: TitleCategoryApiService
    }
  ];
}
