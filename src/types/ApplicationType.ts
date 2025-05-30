import { CollegeType } from "./CollegeType";
import { CourseType } from "./CourseType";
import { UserType } from "./UserTypes";

export type ApplicationType = {
    id?: string;
    userId: string;
    collegeId: string;
    courseId: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType;
    course?: CourseType;
    college?: CollegeType;
};

export type ApplicationTypeWithId = ApplicationType & {
    id: string;
}

export type UpdateApplicationType = Omit<ApplicationType, "course" | "college">;
