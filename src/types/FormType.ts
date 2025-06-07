/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldType = 'text' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'textarea';

export interface FormFieldSchema {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: { label: string; value: any }[];
    validation?: {
        required?: boolean;
        maxLength?: number;
        minLength?: number;
    };
}

export interface DynamicFormProps {
    schema: FormFieldSchema[];
    onSubmit: (data: any) => void;
    loading?: boolean;
    editItem?: Partial<any>;
}
