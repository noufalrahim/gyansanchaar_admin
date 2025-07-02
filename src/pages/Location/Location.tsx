/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { TableComponent } from "@/components/Table";
import { Loader2, Plus } from "lucide-react";
import { LocationType, FormFieldSchema } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { GeneralizedModalForm } from "@/components/Form";
import { useCreateData } from "@/hooks/useCreateData";
import { columns as rawColumns } from "@/columns/LocationColumn";
import { useModifyData } from "@/hooks/useModifyData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { DialogModal } from "@/components/Modal";
import { States } from "@/lib/StatesData";

const locationSchema: FormFieldSchema[] = [
    {
        name: "state",
        label: "State",
        type: "dropdown",
        options: States.map((st) => ({
            label: st.name,
            value: st.name,
        })),
        placeholder: "Select State",
        validation: { required: true, maxLength: 50 }
    },
    {
        name: "place",
        label: "Place",
        type: "text",
        placeholder: "Eg: Bengaluru",
        validation: { required: true, maxLength: 50 }
    },
];

const END_POINT = '/locations';

export default function Location() {
    const [open, setOpen] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<LocationType | { id: string } | undefined>();

    const { data, isLoading, isError, refetch } = useReadData<LocationType[]>('location', END_POINT);
    const { mutate: createMutate, isPending: isCreating } = useCreateData<LocationType>(END_POINT);
    const { mutate: updateMutate, isPending: isUpdating } = useModifyData<LocationType>(END_POINT);
    const { mutate: deleteMutate, isPending: isDeleting } = useDeleteData(END_POINT);

    const memoizedColumns = useMemo(() => rawColumns, []);

    const handleEdit = useCallback((item: LocationType | undefined) => {
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

    if (isLoading) return (
        <div className="h-screen items-center flex justify-center">
            <Loader2 className="mr-2 h-7 w-7 animate-spin" />
        </div>
    );
    if (isError) return <p>An error occurred!</p>;

    return (
        <div>
            <AppBar title="Locations" description="Manage all your locations here">
                <PrimaryButton
                    onClick={() => {
                        setSelectedItem(undefined);
                        setOpen(true);
                    }}
                    label="Add Location"
                    leadIcon={<Plus />}
                />
            </AppBar>

            <TableComponent
                columns={memoizedColumns}
                data={data}
                filterColumn="place"
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
            />

            <GeneralizedModalForm
                open={open}
                setOpen={setOpen}
                schema={locationSchema}
                onSubmit={handleSubmit}
                title="Locations"
                description="Add a new location"
                loading={isCreating || isUpdating}
                editItem={selectedItem}
            />

            <DialogModal open={openWarnModal} setOpen={setOpenWarnModal} title="Delete Location">
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
