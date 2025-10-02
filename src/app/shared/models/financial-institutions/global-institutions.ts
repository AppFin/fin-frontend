import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { InstitutionType } from '../../enums/financial-institutions/institution-type.enum';

export interface GlobalInstitution {
  code: BankCode;
  name: string;
  country: string;
  type: InstitutionType;
  hasLogo: boolean;
}

export const GLOBAL_INSTITUTIONS: GlobalInstitution[] = [
  // ========== BANCOS TRADICIONAIS (BANK) ==========
  // Brasil
  { code: BankCode.BancoDoBrasil, name: 'Banco do Brasil', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Santander, name: 'Santander', country: 'BR/ES', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Caixa, name: 'Caixa Econômica Federal', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Bradesco, name: 'Bradesco', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Itau, name: 'Itaú Unibanco', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Safra, name: 'Safra', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.BTGPactual, name: 'BTG Pactual', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Original, name: 'Original', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.BancoPan, name: 'Pan', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.BanrisulS_A, name: 'Banrisul', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.BRB, name: 'BRB - Banco de Brasília', country: 'BR', type: InstitutionType.Bank, hasLogo: true },
  
  // Internacional
  { code: BankCode.BankOfAmerica, name: 'Bank of America', country: 'US', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.Citibank, name: 'Citibank', country: 'US', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.MUFG, name: 'MUFG', country: 'JP', type: InstitutionType.Bank, hasLogo: true },
  { code: BankCode.BNPParibas, name: 'BNP Paribas', country: 'FR', type: InstitutionType.Bank, hasLogo: true },
  
  // ========== BANCOS DIGITAIS (DIGITAL_BANK) ==========
  // Brasil
  { code: BankCode.BancoInter, name: 'Inter', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  { code: BankCode.Nubank, name: 'Nubank', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  { code: BankCode.C6Bank, name: 'C6', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  { code: BankCode.Neon, name: 'Neon', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  { code: BankCode.BancoBS2, name: 'BS2', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  { code: BankCode.PineBank, name: 'Pine', country: 'BR', type: InstitutionType.DigitalBank, hasLogo: true },
  
  // Internacional (exemplos sem logo no sistema ainda)
  { code: '026' as BankCode, name: 'N26', country: 'DE/EU', type: InstitutionType.DigitalBank, hasLogo: false },
  { code: '999' as BankCode, name: 'Revolut', country: 'UK/Global', type: InstitutionType.DigitalBank, hasLogo: false },
  { code: '998' as BankCode, name: 'Chime', country: 'US', type: InstitutionType.DigitalBank, hasLogo: false },
  
  // ========== CONTAS EMPRESARIAIS (BUSINESS_ACCOUNT) ==========
  { code: BankCode.ContaSimples, name: 'Conta Simples', country: 'BR', type: InstitutionType.BusinessAccount, hasLogo: true },
  { code: BankCode.Cora, name: 'Cora', country: 'BR', type: InstitutionType.BusinessAccount, hasLogo: true },
  { code: BankCode.Omie, name: 'Omie.Cash', country: 'BR', type: InstitutionType.BusinessAccount, hasLogo: true },
  { code: BankCode.Transfeera, name: 'Transfeera', country: 'BR', type: InstitutionType.BusinessAccount, hasLogo: true },
  { code: BankCode.AsaasIP, name: 'Asaas', country: 'BR', type: InstitutionType.BusinessAccount, hasLogo: true },
  
  // Internacional (exemplos)
  { code: '997' as BankCode, name: 'Wells Fargo', country: 'US', type: InstitutionType.BusinessAccount, hasLogo: false },
  { code: '996' as BankCode, name: 'CaixaBank', country: 'ES', type: InstitutionType.BusinessAccount, hasLogo: false },
  
  // ========== OUTROS (OTHER) ==========
  { code: BankCode.PagSeguro, name: 'PagSeguro', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.Mercado_Pago, name: 'Mercado Pago', country: 'BR/LATAM', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.PicPay, name: 'PicPay', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.Stone, name: 'Stone Pagamentos', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.Ailos, name: 'Ailos', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.SicoobBancoob, name: 'Sicoob', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.Unicred, name: 'Unicred', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  { code: BankCode.Sicredi, name: 'Sicredi', country: 'BR', type: InstitutionType.Other, hasLogo: true },
  
  // Internacional (exemplos)
  { code: '995' as BankCode, name: 'PayPal', country: 'US/Global', type: InstitutionType.Other, hasLogo: false },
  { code: '994' as BankCode, name: 'Bizum', country: 'ES', type: InstitutionType.Other, hasLogo: false },
  { code: '993' as BankCode, name: 'Cash App', country: 'US', type: InstitutionType.Other, hasLogo: false },
];

/**
 * Filtra instituições por tipo
 */
export function getInstitutionsByType(type: InstitutionType): GlobalInstitution[] {
  return GLOBAL_INSTITUTIONS.filter(inst => inst.type === type);
}

/**
 * Busca instituição por código
 */
export function getInstitutionByCode(code: BankCode): GlobalInstitution | undefined {
  return GLOBAL_INSTITUTIONS.find(inst => inst.code === code);
}
