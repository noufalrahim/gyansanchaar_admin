import { StatusType } from "@/types/StatusType";
import { CheckCircle, Clock, HelpCircle, LucideIcon, Send, XCircle } from "lucide-react";

export const statusMap: Record<
    | typeof StatusType.Application[keyof typeof StatusType.Application]
    | typeof StatusType.Documents[keyof typeof StatusType.Documents]
    | typeof StatusType.Payment[keyof typeof StatusType.Payment]
    | typeof StatusType.Admission[keyof typeof StatusType.Admission]
    | typeof StatusType.Other[keyof typeof StatusType.Other],
    { label: string; color: string, icon: LucideIcon }
> = {
    [StatusType.Application.ApplicationFormPending]: {
        label: "Pending Application Submission",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock
    },
    [StatusType.Application.ApplicationFormRejected]: {
        label: "Application Rejected",
        color: "bg-red-100 text-red-800",
        icon: XCircle
    },
    [StatusType.Application.ApplicationFormSubmitted]: {
        label: "Application Submitted",
        color: "bg-blue-100 text-blue-800",
        icon: Send
    },
    [StatusType.Application.ApplicationFormVerificationPending]: {
        label: "Application Verification Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Application.ApplicationFormVerified]: {
        label: "Application Verified",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Payment.PaymentPending]: {
        label: "Payment Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Payment.PaymentCompleted]: {
        label: "Payment Completed",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Documents.DocumentUploadPending]: {
        label: "Documents Upload Pending",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock
    },
    [StatusType.Documents.DocumentVerificationPending]: {
        label: "Documents Verification Pending",
        color: "bg-orange-100 text-orange-800",
        icon: Clock
    },
    [StatusType.Documents.DocumentVerificationRejected]: {
        label: "Documents Verification Rejected",
        color: "bg-red-100 text-red-800",
        icon: XCircle
    },
    [StatusType.Documents.DocumentVerified]: {
        label: "Documents Verified",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },

    [StatusType.Admission.AdmissionLetterOffered]: {
        label: "Admission Offered",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle
    },
    [StatusType.Admission.AdmissionLetterPending]: {
        label: "Pending Admission Offer",
        color: "bg-blue-100 text-blue-800",
        icon: Clock
    },

    [StatusType.Other.Unknown]: {
        label: "Unknown",
        color: "bg-gray-100 text-gray-800",
        icon: HelpCircle
    },
    document_uploaded: {
        label: "",
        color: "",
        icon: HelpCircle
    },
    document_upload_rejected: {
        label: "",
        color: "",
        icon: HelpCircle
    }
};
