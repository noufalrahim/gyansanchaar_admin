import { DocumentForCollegeJoinType } from "@/types/DocumentForCollegeJoinType";

export default function formatdocumentForCollegeData(documentForCollegeData: DocumentForCollegeJoinType[] | undefined) {

  if(!documentForCollegeData){
    return null;
  }

  return documentForCollegeData.map(item => {
    const { documents_for_college, course, course_frame, document_frame} = item;

    return {
      ...documents_for_college,
      documentFrame: {
        ...document_frame,
      },
      course: {
        ...course,
        courseFrame: {
          ...course_frame
        }
      },
    };
  });
}
