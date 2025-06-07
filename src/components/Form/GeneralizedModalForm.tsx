/* eslint-disable @typescript-eslint/no-explicit-any */
// components/GeneralizedModalForm.tsx
import { DialogModal } from "@/components/Modal";
import { FormFieldSchema } from "@/types";
import DynamicForm from "./DynamicForm";

interface GeneralizedModalFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    schema: FormFieldSchema[];
    onSubmit: (data: any) => void;
    title: string;
    description?: string;
    loading?: boolean;
    editItem: undefined | any;
}

export default function GeneralizedModalForm({
    open, setOpen, schema, onSubmit, title, description, loading, editItem
}: GeneralizedModalFormProps) {
    return (
        <DialogModal title={title} description={description || ""} open={open} setOpen={setOpen}>
            <DynamicForm
                schema={schema}
                onSubmit={(data) => {
                    onSubmit(data);
                    setOpen(false);
                }}
                loading={loading}
                editItem={editItem}
            />
        </DialogModal>
    );
}
