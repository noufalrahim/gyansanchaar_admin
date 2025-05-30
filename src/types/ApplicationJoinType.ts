import { ApplicationType } from "./ApplicationType";
import { CollegeType } from "./CollegeType";
import { CourseFrameType } from "./CourseFrameType";
import { CourseType } from "./CourseType";
import { UserType } from "./UserTypes";

export type ApplicationJoinType = {
    application: ApplicationType;
    course: CourseType;
    college: CollegeType;
    course_frame: CourseFrameType;
    users: UserType;
};