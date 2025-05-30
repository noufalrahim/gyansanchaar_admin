import { DocumentType } from "./DocumentType";

export type UploadDocumentsType = {
    id?: string;
    documentId: string;
    applicationId: string;
    uploadedAt?: string;
    document: DocumentType;
    name: string;
};

