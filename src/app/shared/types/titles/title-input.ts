import { TitleType } from "../../enums/titles/title-type";

export type TitleInput = {
  value: number;
  type: TitleType;
  description: string;
  date: Date;
  walletId: string;
  titleCategoriesIds: string[];
}
