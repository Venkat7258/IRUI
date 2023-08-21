import { Pagination } from "../common/pagination";

export interface IngredientSearhRequest extends Pagination{ 
    isDelete: boolean | null;
    typeId: number | null;
    selectedColumn: string;
    searchText: string;
    searchBy: string;
}