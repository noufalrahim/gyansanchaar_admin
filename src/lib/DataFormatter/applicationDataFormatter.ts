import { ApplicationJoinType } from "@/types/ApplicationJoinType";

export default function formatApplicationData(applicationData: ApplicationJoinType[] | undefined) {

  if(!applicationData){
    return null;
  }

  return applicationData.map(item => {
    const { application, course, college, course_frame, users } = item;

    return {
      ...application,
      college: {
        ...college
      },
      course: {
        ...course,
        courseFrame: {
            ...course_frame,
        }
      },
      user: {
        ...users
      }
    };
  });
}
