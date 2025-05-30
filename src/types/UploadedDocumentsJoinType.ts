import { ApplicationType } from "./ApplicationType";
import { DocumentFrameType } from "./DocumentFrameType";
import { DocumentType } from "./DocumentType";
import { UploadDocumentsType } from "./UploadDocumentType";

export type UploadedDocumentsJoinType = {
    uploaded_document: UploadDocumentsType;
    document: DocumentType;
    application: ApplicationType;
    document_frame: DocumentFrameType;
};