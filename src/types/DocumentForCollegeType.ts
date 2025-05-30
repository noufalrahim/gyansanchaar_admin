import { DocumentFrameType } from "./DocumentFrameType";

export type DocumentsForCollegeType = {
    id?: string;
    collegeId: string;
    documentFrameId: string;
    documentFrame: DocumentFrameType;
    courseId: string;
};