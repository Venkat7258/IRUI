import { Document } from "./document";
import { Functions } from "./ingredients";

export class Formula extends Document{
    
    formulaId: number
    formulaNo: string
    description: string
    typeId: number
    useType: string
    productType: string
    productSubType: string
    exposureType: string
    otherProductSubType: string
    isSampleFormula: boolean
    amountAppUnits: string
    retensionFactor: number
    amountofProdApp: number
    supplierName: string
    brandName: string
    seasonalorAYR: string
    intendedCountries: string
    remarks: string
    eUorAsiaSeasoned: string
    compliance: string
    areasOfApplication: string
    deliveryMechanism: string
    formulaSpecs: FormulaSpec[]
  }
  
  export interface FormulaSpec {
    id: string
    isDelete: boolean
    createdBy: string
    createdDate: string
    modifiedBy: string
    modifiedDate: string
    formulaSpecsId: number
    formulaId: number
    ingredientId: number
    ingredientName: string
    casNo: string
    typeId: number
    ingredientFunctions: string
    percentage: number
    isCustomized: boolean
    dap: number
    ingredientSource: number
    givenName: string
    dataSource: string
    csIngredientType: string,
    functions: Functions[];
  }
  
// export class Formula extends Document {
//     formulaId: number;
//     formulaNo: string;
//     description: string;
//     typeId: number;
//     useType: string;
//     productType: string;
//     productSubType: string;
//     exposureType: string;
//     otherProductSubType: string;
//     isSampleFormula: boolean;
//     amountAppUnits: string;
//     retensionFactor: number;
//     amountofProdApp: number;
//     supplierName: string;
//     brandName: string;
//     seasonalorAYR: number;
//     intendedCountries: string;
//     remarks: string;
//     eUorAsiaSeasoned: number;
//     compliance: string;
//     areasOfApplication: string;
//     deliveryMechanism: string;
//     formulaSpecs: FormulaSpec[];
// }

// export interface FormulaSpec extends Document {
//     formulaSpecsId: number;
//     formulaId: number;
//     ingredientId: number;
//     ingredientName: string;
//     casNo: string;
//     typeId: number;
//     ingredientFunctions: string;
//     percentage: number;
//     isCustomized: boolean;
//     dap: number;
//     ingredientSource: number;
//     givenName: string;
//     dataSource: string;
//     cSIngredientType: string;
// }