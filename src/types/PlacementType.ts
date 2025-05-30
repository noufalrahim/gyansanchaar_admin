import { PlacementCompanyType } from "./PlacementCompanyType";

export type PlacementType = {
    id?: string;
    collegeId: string;
    averageSalary: number;
    highestSalary: number;
    noOfStudentsPlaced: number,
    placementRate: string,
    placements?: PlacementCompanyType[],
};