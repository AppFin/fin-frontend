import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { InstitutionType } from '../../enums/financial-institutions/institution-type.enum';

export interface GlobalInstitution {
  code: BankCode;
  name: string;
  country: string;
  type: InstitutionType;
  icon: string;
}

export const GLOBAL_INSTITUTIONS: GlobalInstitution[] = [
  { code: BankCode.BancoDoBrasil, name: 'Banco do Brasil', country: 'BR', type: InstitutionType.Bank, icon: 'bancodobrasil' },
  { code: BankCode.Santander, name: 'Santander', country: 'BR/ES', type: InstitutionType.Bank, icon: 'santander' },
  { code: BankCode.Caixa, name: 'Caixa Econômica Federal', country: 'BR', type: InstitutionType.Bank, icon: 'caixa' },
  { code: BankCode.Bradesco, name: 'Bradesco', country: 'BR', type: InstitutionType.Bank, icon: 'bradesco' },
  { code: BankCode.Itau, name: 'Itaú Unibanco', country: 'BR', type: InstitutionType.Bank, icon: 'itau' },
  { code: BankCode.Safra, name: 'Safra', country: 'BR', type: InstitutionType.Bank, icon: 'safra' },
  { code: BankCode.BTGPactual, name: 'BTG Pactual', country: 'BR', type: InstitutionType.Bank, icon: 'btg' },
  { code: BankCode.Original, name: 'Original', country: 'BR', type: InstitutionType.Bank, icon: 'original' },
  { code: BankCode.Banrisul, name: 'Banrisul', country: 'BR', type: InstitutionType.Bank, icon: 'banrisul' },
  
  { code: BankCode.BancoInter, name: 'Inter', country: 'BR', type: InstitutionType.DigitalBank, icon: 'inter' },
  { code: BankCode.Nubank, name: 'Nubank', country: 'BR', type: InstitutionType.DigitalBank, icon: 'nubank' },
  { code: BankCode.C6Bank, name: 'C6', country: 'BR', type: InstitutionType.DigitalBank, icon: 'c6' },
  { code: BankCode.Neon, name: 'Neon', country: 'BR', type: InstitutionType.DigitalBank, icon: 'neon' },
  { code: BankCode.BancoBS2, name: 'BS2', country: 'BR', type: InstitutionType.DigitalBank, icon: 'bs2' },
  { code: BankCode.PineBank, name: 'Pine', country: 'BR', type: InstitutionType.DigitalBank, icon: 'pine' },
  
  { code: BankCode.PagSeguro, name: 'PagSeguro', country: 'BR', type: InstitutionType.Other, icon: 'pagseguro' },
  { code: BankCode.Mercado_Pago, name: 'Mercado Pago', country: 'BR/LATAM', type: InstitutionType.Other, icon: 'mercadopago' },
  { code: BankCode.PicPay, name: 'PicPay', country: 'BR', type: InstitutionType.Other, icon: 'picpay' },
  { code: BankCode.Stone, name: 'Stone', country: 'BR', type: InstitutionType.Other, icon: 'stone' },
  { code: BankCode.Sicoob, name: 'Sicoob', country: 'BR', type: InstitutionType.Other, icon: 'sicoob' },
];

export function getInstitutionsByType(type: InstitutionType): GlobalInstitution[] {
  return GLOBAL_INSTITUTIONS.filter(inst => inst.type === type);
}

export function getInstitutionByCode(code: BankCode): GlobalInstitution | undefined {
  return GLOBAL_INSTITUTIONS.find(inst => inst.code === code);
}

export function getBankIconPath(code: BankCode): string {
  const institution = getInstitutionByCode(code);
  return institution ? `/icons/bank/${institution.icon}.png` : '';
}
