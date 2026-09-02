import { CreditChargePersonInput } from './credit-charge-person-input';

export type CreditChargeInput = {
  value: number;
  description: string;
  date: Date;
  numberOfInstallments: number;
  creditCardId: string;
  creditChargeCategoriesIds: string[];
  creditChargePeople: CreditChargePersonInput[];
};
