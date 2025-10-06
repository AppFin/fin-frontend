export enum InstitutionType {
  Bank = 0,
  BusinessAccount = 1,
  DigitalBank = 2,
  FoodCard = 3,
  Other = 4,
}

export const INSTITUTION_TYPE_LABELS: Record<InstitutionType, string> = {
  [InstitutionType.Bank]: 'Banco Tradicional',
  [InstitutionType.BusinessAccount]: 'Conta Empresarial / PJ',
  [InstitutionType.DigitalBank]: 'Banco Digital',
  [InstitutionType.FoodCard]: 'Cartão Alimentação',
  [InstitutionType.Other]: 'Outro',
};
