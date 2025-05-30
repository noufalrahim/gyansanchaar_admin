/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { useReadData } from "@/hooks/useReadData";
import { SnapshotType } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const snapshotSchema = z.object({
  label: z.string().min(2, "Label required").max(50),
  value: z.string().min(1, "Value required"),
});

const formSchema = z.object({
  snapshots: z.array(snapshotSchema),
});

interface InstituteSnapshotProps {
  onNext: (data: any) => void;
  loading: boolean;
  editItem: string | undefined;
};

export default function InstituteSnapshot({ onNext, loading, editItem }: InstituteSnapshotProps) {

  const { data, isLoading } = useReadData<SnapshotType[]>(
    `snapshotByCollegeId-${editItem}`,
    editItem ? `/institute-snapshots/fields/many?collegeId=${editItem}` : null
  );

  console.log(data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      snapshots: [
        {
          label: "",
          value: "",
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: "snapshots",
    control: form.control,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      replace(
        data.map((snp) => ({
          label: snp.label,
          value: snp.value
        }))
      );
    }
  }, [data, replace]);


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //   const finalData = {
    //     ...values,
    //     snapshots: values.courses.map((course, idx) => ({
    //       ...course,
    //       logo: logos[idx],
    //     })),
    //   };
    console.log(values);
    onNext(values);
  };

  if (isLoading) {
    return <Loader2 className="animate-spin" />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-5 border p-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <FormField
                control={form.control}
                name={`snapshots.${index}.label`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Founded" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`snapshots.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1899" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <div className="h-10 my-5 flex justify-end">
          <SecondaryButton
            label="Add Snapshot"
            type="button"
            className="bg-transparent hover:bg-transparent hover:text-primary-600 shadow-none"
            onClick={() =>
              append({
                label: "",
                value: "",
              })
            }
          />
        </div>

        <div className="w-full flex justify-end">
          <PrimaryButton type="submit" label="Submit" loading={loading} />
        </div>
      </form>
    </Form>
  );
}
