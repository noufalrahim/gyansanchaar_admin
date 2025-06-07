import { CourseFrameType } from "./CourseFrameType";

export type CourseType = {
    id: string;
    collegeId?: string;
    courseFrameId: string;
    courseFrame: CourseFrameType;
    fees: number;
    eligibility: string;
};