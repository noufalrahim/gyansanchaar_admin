export const StatusType = {
    Application: {
        ApplicationFormPending: "application_form_pending",
        ApplicationFormSubmitted: "application_form_submitted",
        ApplicationFormVerificationPending: "application_form_verification_pending",
        ApplicationFormVerified: "application_form_verified",
        ApplicationFormRejected: "application_form_rejected",
    },
    Payment: {
        PaymentPending: "payment_pending",
        PaymentCompleted: "payment_completed",
    },
    Documents: {
        DocumentUploadPending: "document_upload_pending",
        DocumentUploaded: "document_uploaded",
        DocumentVerificationPending: "document_verification_pending",
        DocumentVerified: "document_verified",
        DocumentVerificationRejected: "document_verification_rejected",
    },
    Admission: {
        AdmissionLetterPending: "admission_letter_pending",
        AdmissionLetterOffered: "admission_letter_of_offered",
    },
    Other: {
        Unknown: "unknown",
    },
} as const;

export type StatusTypeValues =
    | typeof StatusType.Application[keyof typeof StatusType.Application]
    | typeof StatusType.Documents[keyof typeof StatusType.Documents]
    | typeof StatusType.Admission[keyof typeof StatusType.Admission]
    | typeof StatusType.Payment[keyof typeof StatusType.Payment];
