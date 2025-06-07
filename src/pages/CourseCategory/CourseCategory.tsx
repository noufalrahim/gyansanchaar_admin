/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { CourseCategoryType, FormFieldSchema } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { columns as rawColumns } from "@/columns/CourseCategoryColumn";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";

const courseCategorySchema: FormFieldSchema[] = [
    {
        name: "name",
        label: "Course Category Name",
        type: "text",
        placeholder: "Eg: Science",
        validation: { required: true, maxLength: 50 }
    }
];

const END_POINT = '/course-categories';

export default function CourseCategory() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CourseCategoryType | { id: string } | undefined>();

    const { data, isLoading, isError, refetch } = useReadData<CourseCategoryType[]>('courseCategory', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<CourseCategoryType>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<CourseCategoryType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const memoizedColumns = useMemo(() => rawColumns, []);

    const handleEdit = useCallback((item: CourseCategoryType | undefined) => {
        setSelectedItem(item);
        setTimeout(() => setOpen(true), 0);    }, []);

    const handleDelete = useCallback((id: string) => {
        setSelectedItem({ id });
        setTimeout(() => setOpenWarnModal(true), 0);
    }, []);

    const handleSubmit = useCallback(
        (formData: any) => {
            const mutationFn = selectedItem && 'id' in selectedItem ? updateMutate : createMutate;
            mutationFn(formData, {
                onSuccess: () => {
                    refetch();
                    setOpen(false);
                },
                onError: (err) => console.error('Mutation Error:', err),
            });
        },
        [selectedItem, updateMutate, createMutate, refetch]
    );

    const handleConfirmDelete = useCallback(() => {
        if (selectedItem && 'id' in selectedItem) {
            deleteMutate(
                { id: selectedItem.id },
                {
                    onSuccess: () => {
                        refetch();
                        setOpenWarnModal(false);
                    },
                    onError: (err) => console.error('Delete Error:', err),
                }
            );
        }
    }, [selectedItem, deleteMutate, refetch]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>An error occurred!</p>;

    return (
        <div>
            <AppBar title="Courses" description="Manage all your course categories here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Course Category"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={data}
                filterColumn="course"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={courseCategorySchema}
                onSubmit={handleSubmit}
                title="Course Category"
                description="Add a new course category"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Course Category">
                <h1 className="font-bold text-xl text-center">
                    Are you sure you want to delete this item? This action cannot be undone.
                </h1>
                <div className="flex flex-row gap-5 mt-5 w-full">
                    <SecondaryButton
                        label="Cancel"
                        onClick={() => setOpenWarnModal(false)}
                        className="w-full bg-primary-main text-white hover:bg-primary-700"
                    />
                    <PrimaryButton
                        className="bg-red-800 hover:bg-red-700 w-full"
                        label="Delete"
                        onClick={handleConfirmDelete}
                        loading={isDeleting}
                    />
                </div>
            </DialogModal>
        </div>
    );
}
