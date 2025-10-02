export enum BankCode {
  // Bancos Tradicionais Principais
  BancoDoBrasil = '001',
  Santander = '033',
  Caixa = '104',
  Bradesco = '237',
  Itau = '341',
  Safra = '422',
  Sicredi = '748',
  Citibank = '745',
  BTGPactual = '208',
  
  // Bancos Digitais
  BancoInter = '077',
  Nubank = '260',
  C6Bank = '336',
  Original = '212',
  Neon = '655',
  
  // Instituições de Pagamento
  PagSeguro = '290',
  Mercado_Pago = '323',
  PicPay = '380',
  Stone = '197',
  
  // Bancos Regionais
  BanrisulS_A = '041',
  Banestes = '021',
  BRB = '070',
  BancoDaAmazonia = '003',
  BancoDoPara = '037',
  BancoDoNordeste = '004',
  BancoDoEstadoDoSergipe = '047',
  
  // Cooperativas
  Ailos = '085',
  Unicred = '136',
  SicoobBancoob = '756',
  Cresol = '133',
  Uniprime = '099',
  Credisis = '097',
  Sulcredi = '114',
  
  // Bancos Comerciais
  BancoABC = '246',
  Sofisa = '637',
  BancoPan = '623',
  Daycoval = '707',
  Rendimento = '633',
  PineBank = '643',
  BancoBS2 = '218',
  BancoBari = '330',
  BancoArbi = '213',
  BancoBMG = '318',
  BancoIndustrial = '604',
  BancoMercantil = '389',
  BancoPaulista = '611',
  BancoTopazio = '082',
  BancoTriangulo = '634',
  
  // Bancos Internacionais
  BankOfAmerica = '755',
  MUFG = '456',
  BNPParibas = '752',
  
  // Fintechs e Digitais
  BeesBank = '010',
  BKBank = '031',
  Capitual = '412',
  ContaSimples = '451',
  Contbank = '360',
  Cora = '403',
  DuePay = '333',
  Efi = '364',
  Grafeno = '355',
  IfoodPago = '368',
  InfinitePay = '419',
  Ip4y = '458',
  LetsBank = '630',
  MagaluPay = '383',
  MultiploBank = '450',
  Omie = '319',
  Omni = '613',
  PinBank = '410',
  QualityBank = '329',
  Sisprime = '084',
  Transfeera = '101',
  XPInvestimentos = '102',
  ZemoBank = '321',
  AsaasIP = '461',
  
  // Outros
  BancoSemear = '743',
  BancoDigital = '340',
  BancoMaster = '243',
  BancoFibra = '224',
  BancoTricury = '018',
  Outro = '999',
}

export const BANK_CODE_LABELS: Record<BankCode, string> = {
  // Bancos Tradicionais Principais
  [BankCode.BancoDoBrasil]: 'Banco do Brasil',
  [BankCode.Santander]: 'Santander',
  [BankCode.Caixa]: 'Caixa Econômica Federal',
  [BankCode.Bradesco]: 'Bradesco',
  [BankCode.Itau]: 'Itaú Unibanco',
  [BankCode.Safra]: 'Banco Safra',
  [BankCode.Sicredi]: 'Sicredi',
  [BankCode.Citibank]: 'Citibank',
  [BankCode.BTGPactual]: 'BTG Pactual',
  
  // Bancos Digitais
  [BankCode.BancoInter]: 'Banco Inter',
  [BankCode.Nubank]: 'Nubank',
  [BankCode.C6Bank]: 'C6 Bank',
  [BankCode.Original]: 'Banco Original',
  [BankCode.Neon]: 'Neon',
  
  // Instituições de Pagamento
  [BankCode.PagSeguro]: 'PagSeguro',
  [BankCode.Mercado_Pago]: 'Mercado Pago',
  [BankCode.PicPay]: 'PicPay',
  [BankCode.Stone]: 'Stone Pagamentos',
  
  // Bancos Regionais
  [BankCode.BanrisulS_A]: 'Banrisul',
  [BankCode.Banestes]: 'Banestes',
  [BankCode.BRB]: 'BRB - Banco de Brasília',
  [BankCode.BancoDaAmazonia]: 'Banco da Amazônia',
  [BankCode.BancoDoPara]: 'Banco do Estado do Pará',
  [BankCode.BancoDoNordeste]: 'Banco do Nordeste',
  [BankCode.BancoDoEstadoDoSergipe]: 'Banco do Estado do Sergipe',
  
  // Cooperativas
  [BankCode.Ailos]: 'Ailos',
  [BankCode.Unicred]: 'Unicred',
  [BankCode.SicoobBancoob]: 'Sicoob',
  [BankCode.Cresol]: 'Cresol',
  [BankCode.Uniprime]: 'Uniprime',
  [BankCode.Credisis]: 'Credisis',
  [BankCode.Sulcredi]: 'Sulcredi',
  
  // Bancos Comerciais
  [BankCode.BancoABC]: 'Banco ABC Brasil',
  [BankCode.Sofisa]: 'Banco Sofisa',
  [BankCode.BancoPan]: 'Banco Pan',
  [BankCode.Daycoval]: 'Banco Daycoval',
  [BankCode.Rendimento]: 'Banco Rendimento',
  [BankCode.PineBank]: 'Banco Pine',
  [BankCode.BancoBS2]: 'Banco BS2',
  [BankCode.BancoBari]: 'Banco Bari',
  [BankCode.BancoArbi]: 'Banco Arbi',
  [BankCode.BancoBMG]: 'Banco BMG',
  [BankCode.BancoIndustrial]: 'Banco Industrial do Brasil',
  [BankCode.BancoMercantil]: 'Banco Mercantil',
  [BankCode.BancoPaulista]: 'Banco Paulista',
  [BankCode.BancoTopazio]: 'Banco Topázio',
  [BankCode.BancoTriangulo]: 'Banco Triângulo',
  
  // Bancos Internacionais
  [BankCode.BankOfAmerica]: 'Bank of America',
  [BankCode.MUFG]: 'MUFG Bank',
  [BankCode.BNPParibas]: 'BNP Paribas',
  
  // Fintechs e Digitais
  [BankCode.BeesBank]: 'Bees Bank',
  [BankCode.BKBank]: 'BK Bank',
  [BankCode.Capitual]: 'Capitual',
  [BankCode.ContaSimples]: 'Conta Simples',
  [BankCode.Contbank]: 'Contbank',
  [BankCode.Cora]: 'Cora',
  [BankCode.DuePay]: 'DuePay',
  [BankCode.Efi]: 'Efí (Gerencianet)',
  [BankCode.Grafeno]: 'Grafeno',
  [BankCode.IfoodPago]: 'iFood Pago',
  [BankCode.InfinitePay]: 'InfinitePay',
  [BankCode.Ip4y]: 'Ip4y',
  [BankCode.LetsBank]: 'Lets Bank',
  [BankCode.MagaluPay]: 'MagaluPay',
  [BankCode.MultiploBank]: 'Multiplo Bank',
  [BankCode.Omie]: 'Omie.Cash',
  [BankCode.Omni]: 'Omni',
  [BankCode.PinBank]: 'PinBank',
  [BankCode.QualityBank]: 'Quality Digital Bank',
  [BankCode.Sisprime]: 'Sisprime',
  [BankCode.Transfeera]: 'Transfeera',
  [BankCode.XPInvestimentos]: 'XP Investimentos',
  [BankCode.ZemoBank]: 'Zemo Bank',
  [BankCode.AsaasIP]: 'Asaas',
  
  // Outros
  [BankCode.BancoSemear]: 'Banco Semear',
  [BankCode.BancoDigital]: 'Banco Digital',
  [BankCode.BancoMaster]: 'Banco Master',
  [BankCode.BancoFibra]: 'Banco Fibra',
  [BankCode.BancoTricury]: 'Banco Tricury',
  [BankCode.Outro]: 'Outro',
};
