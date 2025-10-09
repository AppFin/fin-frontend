import { FinancialInstitutionType } from '../../enums/financial-institutions/financial-institution-type';

export type FinancialInstitutionOutput = {
  id: string;
  name: string;
  code: string;
  type: FinancialInstitutionType;
  icon: string;
  color: string;
  inactive: boolean;
}

