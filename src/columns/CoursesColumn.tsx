import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CourseFrameType } from "@/types";

export const columns: ColumnDef<CourseFrameType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "course",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Course
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
        accessorKey: "duration",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Duration
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="">{row.original.duration}</div>,
    },
    {
        accessorKey: "level",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Level
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="">{row.original.level}</div>,
    },
    {
        accessorKey: "averageSalary",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Average Salary
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <div className="">{row.original.averageSalary}</div>,
    },
];
