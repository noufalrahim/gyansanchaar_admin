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
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  admissions: z.array(
    z.object({
      title: z.string().min(2, "Title is required"),
      criteria: z.array(z.string().min(2, "Criteria is required")),
    })
  ),
});

interface AdmissionProps {
  onNext: (data: any) => void;
  loading: boolean;
};

export default function Admission({ onNext, loading }: AdmissionProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissions: [
        {
          title: "",
          criteria: [""],
        },
      ],
    },
  });

  const { control, setValue, watch } = form;

  const {
    fields: admissionFields,
    append: appendAdmission,
    remove: removeAdmission,
  } = useFieldArray({
    control,
    name: "admissions",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8 animate-in fade-in duration-500">
        {admissionFields.map((admission, index) => {
          const criteria = watch(`admissions.${index}.criteria`) || [];

          const addCriteria = () => {
            setValue(`admissions.${index}.criteria`, [...criteria, ""]);
          };

          const removeCriteria = (critIndex: number) => {
            const updated = [...criteria];
            updated.splice(critIndex, 1);
            setValue(`admissions.${index}.criteria`, updated);
          };

          return (
            <div key={admission.id} className="border p-4 rounded-md space-y-4">
              {/* Title Field */}
              <FormField
                control={control}
                name={`admissions.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Criteria Fields */}
              {criteria.map((_, critIndex) => (
                <div key={critIndex} className="flex gap-2 items-start">
                  <FormField
                    control={control}
                    name={`admissions.${index}.criteria.${critIndex}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Criteria {critIndex + 1}</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Criteria" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {criteria.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeCriteria(critIndex)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              {/* Add Criteria & Remove Title */}
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={addCriteria}>
                  + Add Criteria
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeAdmission(index)}
                >
                  Remove Title
                </Button>
              </div>
            </div>
          );
        })}

        {/* Bottom Controls */}
        <div className="flex justify-end gap-3">
          <SecondaryButton
            type="button"
            label="Add Title"
            onClick={() => appendAdmission({ title: "", criteria: [""] })}
          />
          <PrimaryButton type="submit" label="Next" loading={loading}/>
        </div>
      </form>
    </Form>
  );
}
