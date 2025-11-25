import { TitleType } from '../../enums/titles/title-type';
import { TitlePersonInput } from './title-person-input';

export type TitleInput = {
  value: number;
  type: TitleType;
  description: string;
  date: Date;
  walletId: string;
  titleCategoriesIds: string[];
  titlePeople: TitlePersonInput[];
};
