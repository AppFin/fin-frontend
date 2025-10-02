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
  [BankCode.BanrisulS_A]: {
    folder: 'Banrisul',
    file: 'banrisul-logo-2023.svg',
    alt: 'Banrisul',
  },
  [BankCode.Banestes]: {
    folder: 'Banco do Estado do Espirito Santo',
    file: 'banestes.svg',
    alt: 'Banestes',
  },
  [BankCode.BRB]: {
    folder: 'BRB - Banco de Brasilia',
    file: 'brb-logo-abreviado.svg',
    alt: 'BRB - Banco de Brasília',
  },
  [BankCode.Ailos]: {
    folder: 'Ailos',
    file: 'logo-ailos.svg',
    alt: 'Ailos',
  },
  [BankCode.BancoABC]: {
    folder: 'ABC Brasil',
    file: 'logoabc.svg',
    alt: 'Banco ABC Brasil',
  },
  [BankCode.Sofisa]: {
    folder: 'Banco Sofisa',
    file: 'logo-banco-sofisa.svg',
    alt: 'Banco Sofisa',
  },
  [BankCode.Unicred]: {
    folder: 'Unicred',
    file: 'verde.svg',
    alt: 'Unicred',
  },
  [BankCode.SicoobBancoob]: {
    folder: 'Sicoob',
    file: 'sicoob-minimalista-com.svg',
    alt: 'Sicoob',
  },
  [BankCode.BancoPan]: {
    folder: 'Banco Pan',
    file: 'banco-pan.svg',
    alt: 'Banco Pan',
  },
  [BankCode.Daycoval]: {
    folder: 'Banco Daycoval',
    file: 'logo-Daycoval.svg',
    alt: 'Banco Daycoval',
  },
  [BankCode.Rendimento]: {
    folder: 'Banco Rendimento',
    file: 'banco rendimento logo antiga .svg',
    alt: 'Banco Rendimento',
  },
  [BankCode.PineBank]: {
    folder: 'Banco Pine',
    file: 'banco-pine.svg',
    alt: 'Pine Bank',
  },
  [BankCode.BancoBS2]: {
    folder: 'Banco BS2 S.A',
    file: 'Banco_BS2.svg',
    alt: 'Banco BS2',
  },
  [BankCode.BancoBari]: {
    folder: 'Banco Arbi',
    file: 'Banco_Arbi .svg',
    alt: 'Banco Arbi',
  },
  [BankCode.BancoSemear]: {
    folder: 'Banco Semear',
    file: 'banco-semear.svg',
    alt: 'Banco Semear',
  },
  [BankCode.BancoDigital]: {
    folder: 'Banco Digital',
    file: 'banco-digital.svg',
    alt: 'Banco Digital',
  },
  [BankCode.BancoMaster]: {
    folder: 'Banco Master',
    file: 'banco-master.svg',
    alt: 'Banco Master',
  },
  [BankCode.BancoFibra]: {
    folder: 'Banco Fibra',
    file: 'banco-fibra.svg',
    alt: 'Banco Fibra',
  },
  [BankCode.BancoTricury]: {
    folder: 'Banco Triângulo - Tribanco',
    file: 'logotribanco.svg',
    alt: 'Banco Triângulo',
  },
  [BankCode.Citibank]: {
    folder: 'Citibank',
    file: 'citibank.svg',
    alt: 'Citibank',
  },
  
  // ========== BANCOS REGIONAIS ADICIONAIS ==========
  [BankCode.BancoDaAmazonia]: {
    folder: 'Banco da Amazônia S.A',
    file: 'banco-da-amazonia.svg',
    alt: 'Banco da Amazônia',
  },
  [BankCode.BancoDoPara]: {
    folder: 'Banco do Estado do Para',
    file: 'banpara-logo-fundo.svg',
    alt: 'Banco do Pará',
  },
  [BankCode.BancoDoNordeste]: {
    folder: 'Banco do Nordeste do Brasil S.A',
    file: 'Logo_BNB.svg',
    alt: 'Banco do Nordeste',
  },
  [BankCode.BancoDoEstadoDoSergipe]: {
    folder: 'Banco do Estado do Sergipe',
    file: 'logo banese.svg',
    alt: 'Banese',
  },
  
  // ========== COOPERATIVAS ADICIONAIS ==========
  [BankCode.Cresol]: {
    folder: 'Cresol',
    file: 'Icone-original.svg',
    alt: 'Cresol',
  },
  [BankCode.Uniprime]: {
    folder: 'Uniprime',
    file: 'uniprime.svg',
    alt: 'Uniprime',
  },
  [BankCode.Credisis]: {
    folder: 'Credisis',
    file: 'credisis.svg',
    alt: 'Credisis',
  },
  [BankCode.Sulcredi]: {
    folder: 'Sulcredi',
    file: 'marca.svg',
    alt: 'Sulcredi',
  },
  
  // ========== BANCOS COMERCIAIS ADICIONAIS ==========
  [BankCode.BancoArbi]: {
    folder: 'Banco Arbi',
    file: 'Banco_Arbi .svg',
    alt: 'Banco Arbi',
  },
  [BankCode.BancoBMG]: {
    folder: 'Banco BMG',
    file: 'banco-bmg-logo -nome.svg',
    alt: 'Banco BMG',
  },
  [BankCode.BancoIndustrial]: {
    folder: 'Banco Industrial do Brasil S.A',
    file: 'BIB-logo-fundo.svg',
    alt: 'Banco Industrial',
  },
  [BankCode.BancoMercantil]: {
    folder: 'Banco Mercantil do Brasil S.A',
    file: 'banco-mercantil-novo-azul.svg',
    alt: 'Banco Mercantil',
  },
  [BankCode.BancoPaulista]: {
    folder: 'Banco Paulista',
    file: 'banco-paulista.svg',
    alt: 'Banco Paulista',
  },
  [BankCode.BancoTopazio]: {
    folder: 'Banco Topazio',
    file: 'logo-banco-topazio.svg',
    alt: 'Banco Topázio',
  },
  [BankCode.BancoTriangulo]: {
    folder: 'Banco Triângulo - Tribanco',
    file: 'logotribanco.svg',
    alt: 'Banco Triângulo',
  },
  
  // ========== BANCOS INTERNACIONAIS ==========
  [BankCode.BankOfAmerica]: {
    folder: 'Bank of America',
    file: 'bankofamerica-logo.svg',
    alt: 'Bank of America',
  },
  [BankCode.MUFG]: {
    folder: 'MUFG',
    file: 'mufg-seeklogo-NOME.svg',
    alt: 'MUFG Bank',
  },
  [BankCode.BNPParibas]: {
    folder: 'BNP Paripas',
    file: 'logo-bnp.svg',
    alt: 'BNP Paribas',
  },
  
  // ========== FINTECHS E DIGITAIS ADICIONAIS ==========
  [BankCode.Stone]: {
    folder: 'Stone Pagamentos S.A',
    file: 'stone.svg',
    alt: 'Stone',
  },
  [BankCode.BeesBank]: {
    folder: 'Bees Bank',
    file: 'BEESBank_Horizontal.svg',
    alt: 'Bees Bank',
  },
  [BankCode.BKBank]: {
    folder: 'BK Bank',
    file: 'bkBank.svg',
    alt: 'BK Bank',
  },
  [BankCode.Capitual]: {
    folder: 'Capitual',
    file: 'logo capitual.svg',
    alt: 'Capitual',
  },
  [BankCode.ContaSimples]: {
    folder: 'Conta Simples Soluções em Pagamentos',
    file: 'conta-simples_logo.svg',
    alt: 'Conta Simples',
  },
  [BankCode.Contbank]: {
    folder: 'Contbank',
    file: 'logo-contbank.svg',
    alt: 'Contbank',
  },
  [BankCode.Cora]: {
    folder: 'Cora Sociedade Credito Direto S.A',
    file: 'icone-cora-rosa-2500px.svg',
    alt: 'Cora',
  },
  [BankCode.DuePay]: {
    folder: 'DuePay',
    file: 'Duepay.svg',
    alt: 'DuePay',
  },
  [BankCode.Efi]: {
    folder: 'Efí - Gerencianet',
    file: 'logo-efi-bank-laranja-nome.svg',
    alt: 'Efí',
  },
  [BankCode.Grafeno]: {
    folder: 'Grafeno',
    file: 'grafeno.svg',
    alt: 'Grafeno',
  },
  [BankCode.IfoodPago]: {
    folder: 'Ifood Pago',
    file: 'LOGO-IFOOD-PAGO-BRANCO.svg',
    alt: 'iFood Pago',
  },
  [BankCode.InfinitePay]: {
    folder: 'InfinitePay',
    file: 'InfitePay.svg',
    alt: 'InfinitePay',
  },
  [BankCode.Ip4y]: {
    folder: 'Ip4y',
    file: 'logo-blue.svg',
    alt: 'Ip4y',
  },
  [BankCode.LetsBank]: {
    folder: 'Lets Bank S.A',
    file: 'Logo Letsbank.svg',
    alt: 'Lets Bank',
  },
  [BankCode.MagaluPay]: {
    folder: 'MagaluPay',
    file: 'logo-magalupay.svg',
    alt: 'MagaluPay',
  },
  [BankCode.MultiploBank]: {
    folder: 'Multiplo Bank',
    file: 'logotipo.svg',
    alt: 'Multiplo Bank',
  },
  [BankCode.Omie]: {
    folder: 'Omie.Cash',
    file: 'omie.svg',
    alt: 'Omie',
  },
  [BankCode.Omni]: {
    folder: 'Omni',
    file: 'logo-omni.svg',
    alt: 'Omni',
  },
  [BankCode.PinBank]: {
    folder: 'PinBank',
    file: 'pinBank.svg',
    alt: 'PinBank',
  },
  [BankCode.QualityBank]: {
    folder: 'Quality Digital Bank',
    file: 'quality-logo-cinza.svg',
    alt: 'Quality Digital Bank',
  },
  [BankCode.Sisprime]: {
    folder: 'Sisprime',
    file: 'logo.svg',
    alt: 'Sisprime',
  },
  [BankCode.Transfeera]: {
    folder: 'Transfera',
    file: 'transfeera-logo-verde-nova.svg',
    alt: 'Transfeera',
  },
  [BankCode.XPInvestimentos]: {
    folder: 'XP Investimentos',
    file: 'xp-investimentos-logo.svg',
    alt: 'XP Investimentos',
  },
  [BankCode.ZemoBank]: {
    folder: 'Zemo Bank',
    file: 'logowhite.svg',
    alt: 'Zemo Bank',
  },
  [BankCode.AsaasIP]: {
    folder: 'Asaas IP S.A',
    file: 'header-logo-azul.svg',
    alt: 'Asaas',
  },
  
  [BankCode.Outro]: {
    folder: '',
    file: '',
    alt: 'Outro Banco',
  },
};

/**
 * Retorna o caminho completo do SVG do banco
 * @param code Código do banco
 * @returns Caminho do arquivo SVG ou null se não existir
 */
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
