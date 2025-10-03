import { BankCode } from "../../enums/financial-institutions/bank-code.enum";
import { InstitutionType } from "../../enums/financial-institutions/institution-type.enum";
import { GLOBAL_INSTITUTIONS } from "./global-institutions";

export const BANK_METADATA: Array<{
  code: BankCode;
  name: string;
  type: InstitutionType;
  icon: string;
  aliases: string[];
}> = GLOBAL_INSTITUTIONS.map(inst => ({
  code: inst.code,
  name: inst.name,
  type: inst.type,
  icon: inst.icon,
  aliases: [
    inst.name.toLowerCase(),
    inst.code.toLowerCase(),
    inst.icon.toLowerCase(),
    ...inst.name.toLowerCase().split(" "),
    inst.country.toLowerCase(),
  ].filter(Boolean),
}));

export function searchBankByName(searchTerm: string): (typeof BANK_METADATA)[number] | null {
  if (!searchTerm || searchTerm.trim().length < 2) return null;
  const term = searchTerm.toLowerCase().trim();
  
  // 1. Busca exata por nome completo
  let match = BANK_METADATA.find(bank => 
    bank.name.toLowerCase() === term
  );
  if (match) return match;
  
  // 2. Busca exata por alias (código, ícone)
  match = BANK_METADATA.find(bank =>
    bank.aliases.some(alias => alias === term)
  );
  if (match) return match;
  
  // 3. Busca que começa com o termo (prioriza nome antes de aliases)
  match = BANK_METADATA.find(bank => 
    bank.name.toLowerCase().startsWith(term)
  );
  if (match) return match;
  
  // 4. Busca que começa com o termo nos aliases
  match = BANK_METADATA.find(bank => 
    bank.aliases.some(alias => alias.startsWith(term))
  );
  if (match) return match;
  
  // 5. Busca que contém o termo no nome (prioriza nome)
  match = BANK_METADATA.find(bank =>
    bank.name.toLowerCase().includes(term)
  );
  if (match) return match;
  
  // 6. Busca que contém o termo nos aliases (última opção)
  match = BANK_METADATA.find(bank =>
    bank.aliases.some(alias => alias.includes(term))
  );
  
  return match || null;
}
