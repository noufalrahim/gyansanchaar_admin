import { AdmissionCriteriaType, AdmissionType } from "@/types";

export default function admissionDataFormatter(admissionData: {
    admission: AdmissionType,
    admissionCriteria: AdmissionCriteriaType,
    admission_criteria?: AdmissionCriteriaType
}[]) {
    const formatted = [];

    const map = new Map();

    for (const item of admissionData) {
        const admissionId = item.admission.id;

        if (!map.has(admissionId)) {
            map.set(admissionId, {
                admission: item.admission,
                admissionCriteria: []
            });
        }

        if (item.admission_criteria) {
            map.get(admissionId).admissionCriteria.push(item.admission_criteria);
        }
    }

    for (const value of map.values()) {
        formatted.push(value);
    }

    return formatted;
};