import { BankCode } from "../../enums/financial-institutions/bank-code.enum";
import { InstitutionType } from "../../enums/financial-institutions/institution-type.enum";
import { GLOBAL_INSTITUTIONS } from "./global-institutions";

export const BANK_METADATA: Array<{
  code: BankCode;
  name: string;
  type: InstitutionType;
  aliases: string[];
}> = GLOBAL_INSTITUTIONS.map(inst => ({
  code: inst.code,
  name: inst.name,
  type: inst.type,
  aliases: [
    inst.name.toLowerCase(),
    inst.code.toLowerCase(),
    ...inst.name.toLowerCase().split(" "),
    inst.country.toLowerCase(),
  ].filter(Boolean),
}));

export function searchBankByName(searchTerm: string): (typeof BANK_METADATA)[number] | null {
  if (!searchTerm || searchTerm.trim().length < 2) return null;
  const term = searchTerm.toLowerCase().trim();
  
  let match = BANK_METADATA.find(bank => 
    bank.name.toLowerCase() === term
  );
  if (match) return match;
  
  match = BANK_METADATA.find(bank =>
    bank.aliases.some(alias => alias === term)
  );
  if (match) return match;
  
  match = BANK_METADATA.find(bank => 
    bank.name.toLowerCase().startsWith(term) ||
    bank.aliases.some(alias => alias.startsWith(term))
  );
  if (match) return match;
  
  match = BANK_METADATA.find(bank =>
    bank.name.toLowerCase().includes(term) ||
    bank.aliases.some(alias => alias.includes(term))
  );
  
  return match || null;
}
