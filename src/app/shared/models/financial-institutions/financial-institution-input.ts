import { FinancialInstitutionType } from "../../enums/financial-institutions/financial-institution-type";

export type FinancialInstitutionInput = {
  name: string;
  code: string | null;
  type: FinancialInstitutionType;
  icon: string;
  color: string;
  inactive: boolean;
};
