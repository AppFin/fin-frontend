import { FinancialInstitutionType } from "../../enums/financial-institutions/financial-institution-type";
import { PagedFilteredAndSortedInput } from "../paginations/paged-filtered-and-sorted-input";

export type FinancialInstitutionGetListInput = PagedFilteredAndSortedInput & {
    inactive?: boolean;
    type?: FinancialInstitutionType;
}