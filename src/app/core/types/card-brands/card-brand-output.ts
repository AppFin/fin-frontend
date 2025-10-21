import { IEntity } from '../../../shared/interfaces/entities/i-entity';

export class CardBrandOutput implements IEntity {
  public id: string;
  public name: string;
  public icon: string;
  public color: string;
}
