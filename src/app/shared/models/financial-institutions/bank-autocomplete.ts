import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { InstitutionType } from '../../enums/financial-institutions/institution-type.enum';

export interface BankAutoComplete {
    code: BankCode;
    name: string;
    type: InstitutionType;
    icon: string;
    color: string;
    aliases: string[];
}

export const BANK_AUTOCOMPLETE: BankAutoComplete[] = [
    {
        code: BankCode.BancoDoBrasil,
        name: 'Banco do Brasil',
        type: InstitutionType.Bank,
        icon: 'bancodobrasil',
        color: '#FCD116',
        aliases: ['bb', 'banco do brasil', 'brasil'],
    },
    {
        code: BankCode.Santander,
        name: 'Santander',
        type: InstitutionType.Bank,
        icon: 'santander',
        color: '#EC0000',
        aliases: ['sant', 'santander'],
    },
    {
        code: BankCode.Caixa,
        name: 'Caixa Econômica Federal',
        type: InstitutionType.Bank,
        icon: 'caixa',
        color: '#0071BB',
        aliases: ['caixa', 'cef', 'caixa economica'],
    },
    {
        code: BankCode.Bradesco,
        name: 'Bradesco',
        type: InstitutionType.Bank,
        icon: 'bradesco',
        color: '#CC092F',
        aliases: ['brad', 'bradesco'],
    },
    {
        code: BankCode.Itau,
        name: 'Itaú Unibanco',
        type: InstitutionType.Bank,
        icon: 'itau',
        color: '#EC7000',
        aliases: ['itau', 'itaú', 'unibanco'],
    },
    {
        code: BankCode.Safra,
        name: 'Safra',
        type: InstitutionType.Bank,
        icon: 'safra',
        color: '#0033A0',
        aliases: ['safra', 'banco safra'],
    },
    {
        code: BankCode.BTGPactual,
        name: 'BTG Pactual',
        type: InstitutionType.Bank,
        icon: 'btg',
        color: '#000000',
        aliases: ['btg', 'pactual', 'btg pactual'],
    },
    {
        code: BankCode.Original,
        name: 'Original',
        type: InstitutionType.Bank,
        icon: 'original',
        color: '#00A868',
        aliases: ['original', 'banco original'],
    },
    {
        code: BankCode.Banrisul,
        name: 'Banrisul',
        type: InstitutionType.Bank,
        icon: 'banrisul',
        color: '#005EB8',
        aliases: ['banrisul', 'banco do estado do rio grande do sul'],
    },
    {
        code: BankCode.Sicredi,
        name: 'Sicredi',
        type: InstitutionType.Bank,
        icon: 'sicredi',
        color: '#00A859',
        aliases: ['sicre', 'sicredi'],
    },
    {
        code: BankCode.BancoInter,
        name: 'Inter',
        type: InstitutionType.DigitalBank,
        icon: 'inter',
        color: '#FF7A00',
        aliases: ['int', 'inter', 'banco inter'],
    },
    {
        code: BankCode.Nubank,
        name: 'Nubank',
        type: InstitutionType.DigitalBank,
        icon: 'nubank',
        color: '#820AD1',
        aliases: ['nu', 'nubank', 'roxinho'],
    },
    {
        code: BankCode.C6Bank,
        name: 'C6',
        type: InstitutionType.DigitalBank,
        icon: 'c6',
        color: '#000000',
        aliases: ['c6', 'c6 bank', 'banco c6'],
    },
    {
        code: BankCode.Neon,
        name: 'Neon',
        type: InstitutionType.DigitalBank,
        icon: 'neon',
        color: '#00D1FF',
        aliases: ['neon', 'banco neon'],
    },
    {
        code: BankCode.BancoBS2,
        name: 'BS2',
        type: InstitutionType.DigitalBank,
        icon: 'bs2',
        color: '#FF6B00',
        aliases: ['bs2', 'banco bs2'],
    },
    {
        code: BankCode.PineBank,
        name: 'Pine',
        type: InstitutionType.DigitalBank,
        icon: 'pine',
        color: '#00C853',
        aliases: ['pine', 'pine bank'],
    },
    {
        code: BankCode.PagSeguro,
        name: 'PagSeguro',
        type: InstitutionType.Other,
        icon: 'pagseguro',
        color: '#00A859',
        aliases: ['pag', 'pagseguro', 'uol pagseguro'],
    },
    {
        code: BankCode.Mercado_Pago,
        name: 'Mercado Pago',
        type: InstitutionType.Other,
        icon: 'mercadopago',
        color: '#00B1EA',
        aliases: ['mp', 'mercado pago', 'mercadopago'],
    },
    {
        code: BankCode.PicPay,
        name: 'PicPay',
        type: InstitutionType.Other,
        icon: 'picpay',
        color: '#11C76F',
        aliases: ['pic', 'picpay'],
    },
    {
        code: BankCode.Stone,
        name: 'Stone',
        type: InstitutionType.Other,
        icon: 'stone',
        color: '#00AB4E',
        aliases: ['stone', 'ton'],
    },
    {
        code: BankCode.Sicoob,
        name: 'Sicoob',
        type: InstitutionType.Other,
        icon: 'sicoob',
        color: '#00652E',
        aliases: ['sicoob', 'cooperativa'],
    },
    {
        code: BankCode.Caju,
        name: 'Caju',
        type: InstitutionType.FoodCard,
        icon: 'caju',
        color: '#00D957',
        aliases: ['caju', 'cartão caju'],
    },
    {
        code: BankCode.IfoodPago,
        name: 'iFood Pago',
        type: InstitutionType.Other,
        icon: 'ifood',
        color: '#EA1D2C',
        aliases: ['ifood', 'ifood pago'],
    },
    {
        code: BankCode.Alelo,
        name: 'Alelo',
        type: InstitutionType.FoodCard,
        icon: 'alelo',
        color: '#FF6B00',
        aliases: ['alel', 'alelo', 'cartão alelo'],
    },
    {
        code: BankCode.Ticket,
        name: 'Ticket',
        type: InstitutionType.FoodCard,
        icon: 'ticket',
        color: '#003DA5',
        aliases: ['tick', 'ticket', 'ticket alimentação'],
    },
    {
        code: BankCode.Pluxee,
        name: 'Pluxee',
        type: InstitutionType.FoodCard,
        icon: 'pluxee',
        color: '#7B2D8E',
        aliases: ['plux', 'pluxee', 'sodexo'],
    },
];

export function searchBankByName(term: string): BankAutoComplete[] {
    const searchTerm = term.toLowerCase().trim();
    return BANK_AUTOCOMPLETE.filter(bank =>
        bank.name.toLowerCase().includes(searchTerm) ||
        bank.aliases.some(alias => alias.includes(searchTerm))
    );
}

export function findUniqueBank(term: string): BankAutoComplete | null {
    if (!term || term.length < 3) return null;
    const searchTerm = term.toLowerCase().trim();
    const exactMatches = BANK_AUTOCOMPLETE.filter(bank => 
        bank.name.toLowerCase().startsWith(searchTerm) ||
        bank.aliases.some(alias => alias.startsWith(searchTerm))
    );
    if (exactMatches.length === 1) {
        return exactMatches[0];
    }
    return null;
}

export function getBankIconPath(icon: string): string {
    const iconName = icon.endsWith('.png') ? icon : `${icon}.png`;
    return `/icons/bank/${iconName}`;
}

export function getBankByCode(code: BankCode): BankAutoComplete | undefined {
    return BANK_AUTOCOMPLETE.find(bank => bank.code === code);
}

export const BANK_METADATA = BANK_AUTOCOMPLETE;
