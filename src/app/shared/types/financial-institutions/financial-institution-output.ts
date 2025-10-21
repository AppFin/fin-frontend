import { FinancialInstitutionType } from '../../enums/financial-institutions/financial-institution-type';
import { IEntity } from '../../interfaces/entities/i-entity';

export class FinancialInstitutionOutput implements IEntity {
  public id: string;
  public name: string;
  public code: string;
  public type: FinancialInstitutionType;
  public icon: string;
  public color: string;
  public inactive: boolean;
}

