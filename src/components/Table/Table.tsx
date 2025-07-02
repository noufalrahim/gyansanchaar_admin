import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Edit3, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ApplicationType } from "@/types/ApplicationType";
import { cn } from "@/lib/utils";

interface TableComponentProps<T extends { id: string }> {
    data: T[] | undefined;
    columns: ColumnDef<T>[];
    filterColumn?: string;
    onClickTo?: string;
    onClickEdit?: (editItem: T | undefined) => void;
    onClickDelete?: (id: string) => void;
};

function TableComponentInner<T extends { id: string }>({
    columns,
    data,
    filterColumn,
    onClickTo,
    onClickEdit,
    onClickDelete
}: TableComponentProps<T>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const navigate = useNavigate();

    const safeData = data ?? [];

    const table = useReactTable({
        data: safeData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (!data) {
        return (
            <div className="w-screen h-full items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {filterColumn && (
                    <Input
                        placeholder="Search..."
                        // value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                        value={""}
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm bg-white"
                    />
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-white">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border items-center flex justify-center">
                <Table className="bg-white border border-light-100">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <p className="items-center justify-center flex">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </p>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn(onClickTo && 'cursor-pointer')}
                                    onClick={() =>
                                        onClickTo &&
                                        navigate(`${onClickTo}/${(row.original as unknown as ApplicationType).id}`)
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <div className="items-center flex justify-center">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </div>
                                        </TableCell>
                                    ))}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <TableCell className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-200 rounded-lg items-center justify-center flex">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </TableCell>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-white">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                className="hover:bg-gray-200 rounded-md"
                                                onClick={() => onClickEdit && onClickEdit(row.original)}
                                            >
                                                <Edit3 />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onClickDelete && onClickDelete(row.original.id)}
                                                className="hover:bg-gray-200 rounded-md"
                                            >
                                                <Trash2 className="text-red-500" />
                                                <span className="text-red-500">Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}


const TableComponent = React.memo(TableComponentInner) as typeof TableComponentInner;

export default TableComponent;