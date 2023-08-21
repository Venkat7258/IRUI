import { Document } from "../../shared/models/document";

export class ChemData {
    chemIDPlus: ChemIDPlus;
    echa: Echa;
}

export class ChemIDPlus extends Document {
    substanceName: string;
    substanceNumber: string;
    link: string;
    rn: string;
    unii: string;
    note: string;
    molecularFormula: string;
    molecularWeight: string;
    structure: string;
    classificationCodes: string;
    superlistClassificationCodes: string;
    nlmResources: string;
    regulatoryAgencies: string;
    otherResources: string;
    nameofSubstance: string;
    meshHeading: string;
    synonyms: string;
    systematicName: string;
    superlistNames: string;
    mixtureNames: string;
    otherRegistryNumbers: string;
    inChI: string;
    inChIkey: string;
    smiles: string;
    chemToxicityJson: string;
    chemPhysicalJson: string;
    otherNames: OtherNames[];  
}

export class ChemRegData extends Document {
    ingredientName: string;
    dataSource: string;
    region: string;
    country: string;
    regulatoryStatus: string;
    classification: string;
    restrictions: string;
    restrictionsDescription: string;
    publishedDate: any;
    reviewedDate: any;
}

export class ChineseNames {
    chineseName: string;
}

export class Echa extends Document{
    substanceName: string;
    substanceNumber: string;
    casNo: string | null;
    ecListNo: string | null;
    substanceLink: string;
    bpLink: string | null;
    oblLink: string | null;
    otherNames: OtherNames[];
}

export class EuInciNames {
    euInciName: string;
}

export class Flags extends Document {
    title: string;
    description: string;
    severity: string="";
    referenceLink: string;
    referenceName: string;
    regulatoryChangeType: any;
    effectiveDate: any;
    flagsHistory: FlagsHistory[];
}

export class FlagsHistory extends Document {
    title: string;
    description: string;
    severity: string;
    referenceLink: string;
    referenceName: string;
    regulatoryChangeType: any;
    effectiveDate: any;
    archiveDate: any;
}

export class Functions {
    function: string;
}

export class IngData {
    otherCasno: string;
    einecsNos: string;
    freyrId: string;
    freyrGroupId: string;
    euInciNames: EuInciNames[];
    usInciNames: UsInciNames[];
    japaneseNames: JapaneseNames[];
    chineseNames: ChineseNames[];
    functions: Functions[];
    ingPriority: number;
    dfaIngredient: boolean;
    originOfSubstance: string;
    oralPodNoaelLimit: number;
    podUnits: string;
    cramerClassificationCode: string;
    cramerClassificationLimit: string;
    woeApproach: string;
    woeAssessmentJustification: string;
    adi: number;
    adiUnits: string;
    dap: number;
    scientificOpinion: string;
    chemicalInventoryData: string;
    description: string;
    scientificPanelLimitLO: number;
    scientificPanelLimitRO: number;
    cmr: string;
    svhc: string;
    crIng: string;
    ifraCbcRestriction: string;
    ifraRestrictionDescription: string;
    otherRegulatoryInformation: string;
    safetyConsiderations: string;
    sccsOpinon: string;
    sccsRefLinks: string;
    weightOfEvidence: string;
    regulatoryListing: string;
    literatureSocialMedia: string;
    displayDate: string | null;
    regulatoryChangeType: string;
    effectiveDate: string | null;
    isGlobal: boolean;
    otherNames: OtherNames[];
}

export class UsInciNames {
    usInciName: string;
}

export class JapaneseNames {
    japaneseName: string;
}

export class IngRegData extends Document {
    country: string;
    region: string;
    standardFunctions: string;
    regulatoryStatus: string;
    limitsAndRanges: string;
    labelingRequirement: string;
    referenceLinks: string;
    restrictions: boolean;
    restrictionsDescription: string;
    prohibitions: boolean;
    prohibitionsDescription: string;
    regulatoryDescription: string;
    publishedDate: string | null;
    reviewedDate: string | null;
    regulatoryChangeType: string;
    effectiveDate: string | null;
    comments: string;
}


export class OtherNames {
    otherName: string;
}
export class Ingredients extends  Document{
    ingredientName: string;
    casNo: string;
    ingDataSources: string;
    ingFlags: Flags;
    otherNames: OtherNames[];
    searchInAllNames: OtherNames[];
    ingData: IngData;
    ingRegData: IngRegData[];
    chemData: ChemData;
    chemRegData: ChemRegData[];
    recentUpdates:any[];
}

