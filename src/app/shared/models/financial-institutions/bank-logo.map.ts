import { BankCode } from '../../enums/financial-institutions/bank-code.enum';

export const BANK_LOGO_MAP: Record<BankCode, { folder: string; file: string; alt: string }> = {
  [BankCode.BancoDoBrasil]: {
    folder: 'Banco do Brasil S.A',
    file: 'banco-do-brasil.svg',
    alt: 'Banco do Brasil',
  },
  [BankCode.Santander]: {
    folder: 'Banco Santander Brasil S.A',
    file: 'banco-santander-logo.svg',
    alt: 'Santander',
  },
  [BankCode.Caixa]: {
    folder: 'Caixa Econômica Federal',
    file: 'caixa-economica-federal-X.svg',
    alt: 'Caixa Econômica Federal',
  },
  [BankCode.Bradesco]: {
    folder: 'Bradesco S.A',
    file: 'bradesco.svg',
    alt: 'Bradesco',
  },
  [BankCode.Itau]: {
    folder: 'Itaú Unibanco S.A',
    file: 'logo-nova-letras-brancas.svg',
    alt: 'Itaú',
  },
  [BankCode.Safra]: {
    folder: 'Banco Safra S.A',
    file: 'logo-safra-nome.svg',
    alt: 'Banco Safra',
  },
  [BankCode.Sicredi]: {
    folder: 'Sicredi',
    file: 'logo-svg2.svg',
    alt: 'Sicredi',
  },
  [BankCode.BTGPactual]: {
    folder: 'Banco BTG Pacutal',
    file: 'btg-pactual.svg',
    alt: 'BTG Pactual',
  },
  [BankCode.BancoInter]: {
    folder: 'Banco Inter S.A',
    file: 'inter.svg',
    alt: 'Banco Inter',
  },
  [BankCode.Nubank]: {
    folder: 'Nu Pagamentos S.A',
    file: 'nubank-logo-2021.svg',
    alt: 'Nubank',
  },
  [BankCode.C6Bank]: {
    folder: 'Banco C6 S.A',
    file: 'c6 bank.svg',
    alt: 'C6 Bank',
  },
  [BankCode.Original]: {
    folder: 'Banco Original S.A',
    file: 'banco-original-logo-verde.svg',
    alt: 'Banco Original',
  },
  [BankCode.Neon]: {
    folder: 'Neon',
    file: 'header-logo-neon.svg',
    alt: 'Neon',
  },
  [BankCode.PagSeguro]: {
    folder: 'PagSeguro Internet S.A',
    file: 'logo.svg',
    alt: 'PagSeguro',
  },
  [BankCode.Mercado_Pago]: {
    folder: 'Mercado Pago',
    file: 'mercado-pago.svg',
    alt: 'Mercado Pago',
  },
  [BankCode.PicPay]: {
    folder: 'PicPay',
    file: 'Logo-PicPay.svg',
    alt: 'PicPay',
  },
  [BankCode.Stone]: {
    folder: 'Stone Pagamentos S.A',
    file: 'stone.svg',
    alt: 'Stone',
  },
  [BankCode.Caju]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.Pluxee]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.Banrisul]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.Sicoob]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.PineBank]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.BancoBS2]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.IfoodPago]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.Alelo]: {
    folder: '',
    file: '',
    alt: ''
  },
  [BankCode.Ticket]: {
    folder: '',
    file: '',
    alt: ''
  }
}; 

export function getBankLogoPath(code: BankCode): string | null {
  const bank = BANK_LOGO_MAP[code];
  if (!bank || !bank.folder || !bank.file) {
    return null;
  }
  return `/icons/bank/${bank.folder}/${bank.file}`;
}

/**
 * Retorna o alt text do banco
 * @param code Código do banco
 * @returns Alt text do banco
 */
export function getBankLogoAlt(code: BankCode): string {
  const bank = BANK_LOGO_MAP[code];
  return bank?.alt || 'Banco';
}
