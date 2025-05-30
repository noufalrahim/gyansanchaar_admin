import { CourseJoinType } from "@/types";

export default function formatCourseData(courseData: CourseJoinType[] | undefined) {

  if(!courseData){
    return null;
  }

  return courseData.map(item => {
    const { course, course_frame } = item;

    return {
      ...course,
      courseFrame: {
        ...course_frame
      }
    };
  });
}
