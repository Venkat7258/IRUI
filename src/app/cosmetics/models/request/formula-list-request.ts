import { Pagination } from "../common/pagination";

export interface FormulaListRequest extends Pagination{
    formulaName: string;
    formulaDescription: string;
    ingredientName: string;
    isDelete: boolean;
    skip: number;
    take: number;
    orderBy: string;
    isSampleFormula:boolean;
}