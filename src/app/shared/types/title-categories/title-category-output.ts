import { TitleCategoryType } from '../../enums/title-categories/title-category-type';
import { IEntity } from '../../interfaces/entities/i-entity';

export class TitleCategoryOutput implements IEntity {
  public id: string;
  public name: string;
  public color: string;
  public icon: string;
  public type: TitleCategoryType;
  public inactivated: boolean;
}
