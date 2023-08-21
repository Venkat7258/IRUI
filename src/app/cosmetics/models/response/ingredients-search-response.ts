import { Ingredients } from "../ingredients";
export interface IngredientsSearchResponse {
    listData: Ingredients[];
    totalRows: number;
}