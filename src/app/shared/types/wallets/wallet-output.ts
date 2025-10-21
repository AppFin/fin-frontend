import { IEntity } from "../../interfaces/entities/i-entity";

export class WalletOutput implements IEntity {
  public id: string;
  public name: string;
  public color: string;
  public icon: string;
  public inactivated: boolean;
  public financialInstitutionId: string | null;
  public initialBalance: number;
  public currentBalance: number;
}
