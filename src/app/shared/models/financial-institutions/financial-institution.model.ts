import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { InstitutionType } from '../../enums/financial-institutions/institution-type.enum';

export interface FinancialInstitutionOutput {
  id: string;
  name: string;
  code: BankCode;
  type: InstitutionType;
  logoUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialInstitutionInput {
  name: string;
  code: BankCode;
  type: number;
  logoUrl?: string;
  active: boolean;
}
