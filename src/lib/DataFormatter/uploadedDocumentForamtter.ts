import { UploadDocumentsType } from "@/types";
import { UploadedDocumentsJoinType } from "@/types/UploadedDocumentsJoinType";

export default function formatUploadedDocumentsData(uploadedDocumentsData: UploadedDocumentsJoinType[] | undefined): UploadDocumentsType[] | null {

  if(!uploadedDocumentsData){
    return null;
  }

  return uploadedDocumentsData.map(item => {
    const { document, document_frame, application, uploaded_document } = item;

    return {
      ...uploaded_document,
      application: {
        ...application,
      },
      document: {
        ...document,
        documentFrame: {
          ...document_frame
        }
      }
    };
  });
}
