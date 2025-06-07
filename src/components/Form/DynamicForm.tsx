/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodTypeAny } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PrimaryButton } from "@/components/Buttons";
import { DynamicFormProps, FormFieldSchema } from "@/types";
import { useEffect, useMemo } from "react";
import { Textarea } from "../ui/textarea";

export default function DynamicForm({
    schema,
    onSubmit,
    loading,
    editItem
}: DynamicFormProps) {
    const formSchema = useMemo(() => {
        const zodSchemaObject: Record<string, ZodTypeAny> = {};
        schema.forEach(field => {
            let validator = z.string();
            if (field.validation?.required) validator = validator.min(1, `${field.label} is required`);
            if (field.validation?.maxLength) validator = validator.max(field.validation.maxLength);
            zodSchemaObject[field.name] = validator;
        });
        return z.object(zodSchemaObject);
    }, [schema]);

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    useEffect(() => {
        if (editItem) {
            console.log(editItem);
            form.reset(editItem);
        } else {
            form.reset({});
        }
    }, [editItem]);

    const handleSubmit: SubmitHandler<any> = (data) => {
        if (editItem?.id) data.id = editItem.id;
        onSubmit(data);
    };

    const renderField = (field: FormFieldSchema) => {
        const value = form.watch(field.name);

        switch (field.type) {
            case "text":
            case "number":
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                    />
                );
            case "textarea":
                return (
                    <Textarea
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                    />
                );

            case "dropdown":
                console.log(field);
                return (
                    <Select
                        value={value}
                        onValueChange={(val) => form.setValue(field.name, val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {field.options?.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "radio":
                return (
                    <RadioGroup
                        value={value}
                        onValueChange={(val) => form.setValue(field.name, val)}
                    >
                        {field.options?.map(opt => (
                            <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} />
                                <label>{opt.label}</label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case "checkbox":
                return (
                    <Checkbox
                        checked={!!value}
                        onCheckedChange={(val) => form.setValue(field.name, val)}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {schema.map(field => (
                    <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={() => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    {renderField(field)}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <div className="flex justify-end">
                    <PrimaryButton type="submit" label="Submit" loading={loading} disabled={loading} />
                </div>
            </form>
        </Form>
    );
}
