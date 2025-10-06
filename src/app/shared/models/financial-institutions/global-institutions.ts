import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { InstitutionType } from '../../enums/financial-institutions/institution-type.enum';

export interface GlobalInstitution {
  code: BankCode;
  name: string;
  country: string;
  type: InstitutionType;
  icon: string;
  color: string;
}

export const GLOBAL_INSTITUTIONS: GlobalInstitution[] = [
  { code: BankCode.BancoDoBrasil, name: 'Banco do Brasil', country: 'BR', type: InstitutionType.Bank, icon: 'bancodobrasil', color: '#FCD116' },
  { code: BankCode.Santander, name: 'Santander', country: 'BR/ES', type: InstitutionType.Bank, icon: 'santander', color: '#EC0000' },
  { code: BankCode.Caixa, name: 'Caixa Econômica Federal', country: 'BR', type: InstitutionType.Bank, icon: 'caixa', color: '#0071BB' },
  { code: BankCode.Bradesco, name: 'Bradesco', country: 'BR', type: InstitutionType.Bank, icon: 'bradesco', color: '#CC092F' },
  { code: BankCode.Itau, name: 'Itaú Unibanco', country: 'BR', type: InstitutionType.Bank, icon: 'itau', color: '#EC7000' },
  { code: BankCode.Safra, name: 'Safra', country: 'BR', type: InstitutionType.Bank, icon: 'safra', color: '#0033A0' },
  { code: BankCode.BTGPactual, name: 'BTG Pactual', country: 'BR', type: InstitutionType.Bank, icon: 'btg', color: '#000000' },
  { code: BankCode.Original, name: 'Original', country: 'BR', type: InstitutionType.Bank, icon: 'original', color: '#00A868' },
  { code: BankCode.Banrisul, name: 'Banrisul', country: 'BR', type: InstitutionType.Bank, icon: 'banrisul', color: '#005EB8' },
  { code: BankCode.Sicredi, name: 'Sicredi', country: 'BR', type: InstitutionType.Bank, icon: 'sicredi', color: '#00A859' },
  
  { code: BankCode.BancoInter, name: 'Inter', country: 'BR', type: InstitutionType.DigitalBank, icon: 'inter', color: '#FF7A00' },
  { code: BankCode.Nubank, name: 'Nubank', country: 'BR', type: InstitutionType.DigitalBank, icon: 'nubank', color: '#820AD1' },
  { code: BankCode.C6Bank, name: 'C6', country: 'BR', type: InstitutionType.DigitalBank, icon: 'c6', color: '#000000' },
  { code: BankCode.Neon, name: 'Neon', country: 'BR', type: InstitutionType.DigitalBank, icon: 'neon', color: '#00D1FF' },
  { code: BankCode.BancoBS2, name: 'BS2', country: 'BR', type: InstitutionType.DigitalBank, icon: 'bs2', color: '#FF6B00' },
  { code: BankCode.PineBank, name: 'Pine', country: 'BR', type: InstitutionType.DigitalBank, icon: 'pine', color: '#00C853' },
  
  { code: BankCode.PagSeguro, name: 'PagSeguro', country: 'BR', type: InstitutionType.Other, icon: 'pagseguro', color: '#00A859' },
  { code: BankCode.Mercado_Pago, name: 'Mercado Pago', country: 'BR/LATAM', type: InstitutionType.Other, icon: 'mercadopago', color: '#00B1EA' },
  { code: BankCode.PicPay, name: 'PicPay', country: 'BR', type: InstitutionType.Other, icon: 'picpay', color: '#11C76F' },
  { code: BankCode.Stone, name: 'Stone', country: 'BR', type: InstitutionType.Other, icon: 'stone', color: '#00AB4E' },
  { code: BankCode.Sicoob, name: 'Sicoob', country: 'BR', type: InstitutionType.Other, icon: 'sicoob', color: '#00652E' },
  { code: BankCode.Caju, name: 'Caju', country: 'BR', type: InstitutionType.Other, icon: 'caju', color: '#00D957' },
  { code: BankCode.IfoodPago, name: 'iFood Pago', country: 'BR', type: InstitutionType.Other, icon: 'ifood', color: '#EA1D2C' },
  { code: BankCode.Alelo, name: 'Alelo', country: 'BR', type: InstitutionType.Other, icon: 'alelo', color: '#FF6B00' },
  { code: BankCode.Ticket, name: 'Ticket', country: 'BR', type: InstitutionType.Other, icon: 'ticket', color: '#003DA5' },
  { code: BankCode.Pluxee, name: 'Pluxee', country: 'BR', type: InstitutionType.Other, icon: 'pluxee', color: '#7B2D8E' },
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
