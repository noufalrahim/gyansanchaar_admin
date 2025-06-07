import { NavItemsType, UrlEnum } from "@/types";
import { BookOpen, Building, FileText, GraduationCap, HelpCircle, LucideLayoutDashboard, MapPin, Settings } from "lucide-react";

export const MAIN_NAV_ITEMS: NavItemsType[] = [
    {
        title: "Dashboard",
        url: UrlEnum.default,
        icon: LucideLayoutDashboard,
    },
    {
        title: "Colleges",
        url: UrlEnum.colleges,
        icon: Building,
    },
    {
        title: "Applications",
        url: UrlEnum.applications,
        icon: FileText,
    },
    {
        title: "Courses",
        url: UrlEnum.courses,
        icon: BookOpen,
    },
    {
        title: "Course Category",
        url: UrlEnum.courseCategory,
        icon: GraduationCap,
    },
    {
        title: "Location",
        url: UrlEnum.location,
        icon: MapPin
    }
];

export const SECONDARY_NAV_ITEMS: NavItemsType[] = [
    {
      title: "Settings",
      icon: Settings,
      url: UrlEnum.default,
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      url: UrlEnum.default,
    },
];

export const FORM_ITEM_TYPES = [
    {
        label: "Text",
        value: "text",
    }, {
        label: "Date", 
        value: "date",
    }, 
    {
        label: "Email",
        value: "email",
    },
    {
        label: "Number",
        value: "number",
    },
    {
        label: "Phone Number",
        value: "phone_number",
    },
    {
        label: "URL",
        value: "url",
    },
    {
        label: "Dropdown",
        value: "dropdown",
    },
    {
        label: "Radio",
        value: "radio"
    },
    {
        label: "Checkbox",
        value: "checkbox",
    },
    {
        label: "File Upload",
        value: "file_upload"
    },
    {
        label: "Country",
        value: "country",
    },
] as const;

export type FormItemType = (typeof FORM_ITEM_TYPES)[number];