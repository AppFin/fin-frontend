import { IEntity } from "../../interfaces/entities/i-entity";

export class CreditCardOutput implements IEntity {
  public id: string;
  public name: string;
  public color: string;
  public icon: string;
  public financialInstitutionId: string;
  public cardBrandId: string;
  public debitWalletId: string;
  public dueDay: number;
  public closingDay: number;
  public inactivated: boolean;
  public limit: number;
}
