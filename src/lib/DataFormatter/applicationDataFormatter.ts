/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationJoinType } from "@/types/ApplicationJoinType";

export type FormattedApplicationType = {
  id: string;
  [key: string]: any;
};

export default function formatApplicationData(applicationData: ApplicationJoinType[] | undefined): FormattedApplicationType[] | null {
  if (!applicationData) return null;

  return applicationData.map(item => {
    const { application, course, college, course_frame, users } = item;

    return {
      id: application.id ?? crypto.randomUUID(),
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
