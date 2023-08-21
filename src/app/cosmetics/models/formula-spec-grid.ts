import { Functions, OtherNames } from "./ingredients";

export class FormulaSpecGrid {
    id: string;
    isSelectedForFinalization: boolean;
    isfinalized: boolean;
    formulaSpecsId: number;
    formulaId: number;
    ingredientId: number;
    ingredientName: string;
    casNo: string;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    isDelete: boolean;
    typeId: number;
    ingredientFunctions: string;
    percentage: number;
    isCustomized: boolean;
    dap: number;
    ingredientSource: number;
    givenName: string;
    dataSource: string;
    csIngredientType: string;
    otherFunctions: string;
    otherNames: OtherNames[];
    functions: Functions[];
}