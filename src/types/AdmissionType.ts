import { AdmissionCriteriaType } from "./AdmissionCriteriaType";

export type AdmissionType = {
    id?: string;
    collegeId?: string;
    title: string;
    criteria?: AdmissionCriteriaType[];
};