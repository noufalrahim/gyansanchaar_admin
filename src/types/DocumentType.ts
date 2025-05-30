import { DocumentFrameType } from "./DocumentFrameType";

export type DocumentType = {
    id?: string,
    name: string,
    documentUrl: string,
    publicId: string,
    format: string,
    resourceType: string,
    size: string,
    userId: string,
    documentFrameId: string,
    uploadedAt?: string,
    updatedAt?: string,
    documentFrame?: DocumentFrameType;
};