import { LucideIcon } from "lucide-react";

export type SnapshotType = {
    id: string;
    collegeId?: string;
    label: string;
    value: string;
    // iconName: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    iconName: LucideIcon | string;
};

export type SnapshotWithIdType = SnapshotType & {
    id: string;
}