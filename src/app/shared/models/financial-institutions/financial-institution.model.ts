import { BankCode } from '../../enums/financial-institutions/bank-code.enum';

export interface FinancialInstitutionOutput {
  id: string;
  name: string;
  code: BankCode;
  type: number;
  icon: string;
  color: string;
  active: boolean;
}

export interface FinancialInstitutionInput {
  name: string;
  code: BankCode;
  type: number;
  icon: string;
  color: string;
  active: boolean;
}
