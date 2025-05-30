export type CollegeType = {
    id?: string;
    name: string;
    description: string;
    location: string;
    coverImage: string;
    logo: string;
    rank: string;
};

export type CollegeTypeWithId = CollegeType & {
    id: string;
};