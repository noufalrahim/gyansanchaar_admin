import { CourseFrameType } from "./CourseFrameType";
import { CourseType } from "./CourseType";
import { DocumentsForCollegeType } from "./DocumentForCollegeType";
import { DocumentFrameType } from "./DocumentFrameType";

export type DocumentForCollegeJoinType = {
    documents_for_college: DocumentsForCollegeType;
    document_frame: DocumentFrameType;
    course: CourseType;
    course_frame: CourseFrameType;
};