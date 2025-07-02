/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Loader2, Plus } from "lucide-react";
import { CourseCategoryType, CourseFrameType, FormFieldSchema } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { columns as rawColumns } from "@/columns/CoursesColumn";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";

const END_POINT = '/course-frames';

export default function Courses() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CourseFrameType | { id: string } | undefined>();

    const { data: courseCategoryData, isLoading: courseCatgeoryIsLoading } = useReadData<CourseCategoryType[]>('courseCategory', '/course-categories');

    const { data, isLoading, isError, refetch } = useReadData<CourseFrameType[]>('courseFrames', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<CourseFrameType>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<CourseFrameType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const courseSchema: FormFieldSchema[] = [
        {
            name: "name",
            label: "Course Name",
            type: "text",
            placeholder: "Eg: Science",
            validation: { required: true }
        },
        {
            name: "subheader",
            label: "Subheading",
            type: "textarea",
            placeholder: "Subheader",
            validation: { required: true }
        },
        {
            name: "duration",
            label: "Duration",
            type: "text",
            placeholder: "Eg: 4",
            validation: { required: true, maxLength: 50 }
        },
        {
            name: "courseCategoryId",
            label: "Course Category",
            type: "dropdown",
            options: courseCategoryData && courseCategoryData.map((cc) => ({
                label: cc.name,
                value: cc.id,
            })),
            placeholder: 'Select Course Category',
            validation: { required: true }
        },
        {
            name: "level",
            label: "Level",
            type: "dropdown",
            options: [
                {
                    label: "Undergraduation",
                    value: "undergraduation",

                },
                {
                    label: "Postgraduation",
                    value: "postgraduation"
                }
            ],
            placeholder: "Select Level",
            validation: { required: true }
        },
        {
            name: "averageSalary",
            label: "Average Salary",
            type: "text",
            placeholder: "Eg: $450000-$600000",
            validation: { required: true, maxLength: 50 }
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            placeholder: "Description",
            validation: { required: true }
        },
    ];

    const memoizedColumns = useMemo(() => rawColumns, []);

    const handleEdit = useCallback((item: CourseFrameType | undefined) => {
        setSelectedItem(item);
        setTimeout(() => setOpen(true), 0);
    }, []);

    const handleDelete = useCallback((id: string) => {
        setSelectedItem({ id });
        setTimeout(() => setOpenWarnModal(true), 0);
    }, []);

    const handleSubmit = useCallback(
        (formData: any) => {
            const mutationFn = selectedItem && 'id' in selectedItem ? updateMutate : createMutate;
            console.log(formData);
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

    if (isLoading || courseCatgeoryIsLoading) return (
        <div className="h-screen items-center flex justify-center">
                        <Loader2 className="mr-2 h-7 w-7 animate-spin" />
                    </div>
    );
    if (isError) return <p>An error occurred!</p>;

    return (
        <div>
            <AppBar title="Courses" description="Manage all your course here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Course"
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
                schema={courseSchema}
                onSubmit={handleSubmit}
                title="Course Category"
                description="Add a new course"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Course">
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
