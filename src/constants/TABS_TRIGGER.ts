import { Award, BookOpen, BookOpenCheck, Building, GraduationCap } from "lucide-react";

export const TABS_TRIGGER_VALUES = {
    OVERVIEW: 'overview',
    COURSES: 'courses',
    ADMISSION: 'admission',
    PLACEMENTS: 'placements',
    CAMPUS: 'campus',
};

export const TABS_TRIGGER = [
    {
        value: TABS_TRIGGER_VALUES.OVERVIEW,
        label: 'Overview',
        icon: BookOpen,
    },
    {
        value: TABS_TRIGGER_VALUES.COURSES,
        label: 'Courses & Fees',
        icon: BookOpenCheck,
    },
    {
        value: TABS_TRIGGER_VALUES.ADMISSION,
        label: 'Admission',
        icon: GraduationCap,
    },
    {
        value: TABS_TRIGGER_VALUES.PLACEMENTS,
        label: 'Placements',
        icon: Award,
    },
    {
        value: TABS_TRIGGER_VALUES.CAMPUS,
        label: 'Campus',
        icon: Building,
    }
];