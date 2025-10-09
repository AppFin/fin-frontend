export type WalletOutput = {
  id: string;
  name: string;
  color: string;
  icon: string;
  inactivated: boolean;
  financialInstitutionId: string | null;
  initialBalance: boolean;
  currentBalance: boolean;
}