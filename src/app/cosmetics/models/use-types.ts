import { Document } from "./document";

export interface UseTypes extends Document {
    useTypeId: number;
    useType: string;
    description: string;
    typeId: number;
    isActive: boolean;
    code: string;
}