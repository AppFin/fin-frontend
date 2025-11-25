import { TitleType } from '../../enums/titles/title-type';
import { IEntity } from '../../interfaces/entities/i-entity';
import { TitlePersonOutput } from './title-person-output';

export class TitleOutput implements IEntity {
  public id: string;
  public description: string;
  public value: number;
  public effectiveValue: number;
  public previousBalance: number;
  public resultingBalance: number;
  public type: TitleType;
  public date: Date;
  public walletId: string;
  public titleCategoriesIds: string[];
  public titlePeople: TitlePersonOutput[];
}
