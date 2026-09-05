import { IEntity } from '../../interfaces/entities/i-entity';
import { CreditChargePersonOutput } from './credit-charge-person-output';

export class CreditChargeOutput implements IEntity {
  public id: string;
  public description: string;
  public value: number;
  public numberOfInstallments: number;
  public date: Date;
  public creditCardId: string;
  public creditChargeCategoriesIds: string[];
  public creditChargePeople: CreditChargePersonOutput[];
}
