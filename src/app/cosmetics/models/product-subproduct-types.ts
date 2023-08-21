import { Document } from "./document";

export interface ProductSubProductTypes extends Document {
    productName: string;
    useType: string;
    exposureType: string;
    subProductName: string;
    units: string;
    retensionFactor: number;
    amountofProdApp: number;
    areasOfApplicationName: string;
    deliveryMechanismName: string;
}