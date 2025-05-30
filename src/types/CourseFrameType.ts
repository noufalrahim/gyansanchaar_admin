export type CourseFrameType = {
    id?: string;
    name: string;
    duration: string;
};

export type CourseFrameTypeWithId = CourseFrameType & {
    id: string;
}