export enum InstitutionType {
  Bank = 'BANK',
  BusinessAccount = 'BUSINESS_ACCOUNT',
  DigitalBank = 'DIGITAL_BANK',
  Other = 'OTHER',
}

export const INSTITUTION_TYPE_LABELS: Record<InstitutionType, string> = {
  [InstitutionType.Bank]: 'Banco Tradicional',
  [InstitutionType.BusinessAccount]: 'Conta Empresarial / PJ',
  [InstitutionType.DigitalBank]: 'Banco Digital',
  [InstitutionType.Other]: 'Outro',
};

export const INSTITUTION_TYPE_TO_NUMBER: Record<InstitutionType, number> = {
  [InstitutionType.Bank]: 1,
  [InstitutionType.BusinessAccount]: 2,
  [InstitutionType.DigitalBank]: 3,
  [InstitutionType.Other]: 99,
};

export const NUMBER_TO_INSTITUTION_TYPE: Record<number, InstitutionType> = {
  1: InstitutionType.Bank,
  2: InstitutionType.BusinessAccount,
  3: InstitutionType.DigitalBank,
  99: InstitutionType.Other,
};
