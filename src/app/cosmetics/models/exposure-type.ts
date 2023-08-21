import { Document } from "./document";

export interface ExposureType extends Document {
    exposureId: number | null;
    exposureName: string | null;
    description: string | null;
    typeId: number | null;
    code: string | null;
    isActive: boolean | null;
}