import { Document } from "./document";

export class ProductTypes extends Document {
    productName: string | null;
    description: string | null;
}