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

const placementSchema = z.object({
  name: z.string().min(2, "Company name required").max(50),
  noOfPeoplePlaced: z.string().min(1, "Number required"),
});

const formSchema = z.object({
  noOfStudentsPlaced: z.string().min(1, "Required"),
  placementRate: z.string().min(1, "Required"),
  highestSalary: z.string().min(1, "Highest package is required"),
  averageSalary: z.string().min(1, "Average package is required"),
  placements: z.array(placementSchema),
});

interface PlacementProps {
  loading: boolean;
  onNext: (data: any) => void;
};

export default function Placements({ onNext, loading }: PlacementProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noOfStudentsPlaced: "",
      placementRate: "",
      highestSalary: "",
      averageSalary: "",
      placements: [
        {
          name: "",
          noOfPeoplePlaced: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "placements",
    control: form.control,
  });


  const onSubmit = (values: z.infer<typeof formSchema>) => {
      const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
      const logos = Array.from(fileInputs).map((input) => input.files?.[0] || null);
      const finalData = {
        ...values,
        placements: values.placements.map((placement, idx) => ({
          ...placement,
          logo: logos[idx],
        })),
      };
      console.log(finalData);
      onNext(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="noOfStudentsPlaced"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total Placed Students</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placementRate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Placement Rate (%)</FormLabel>
                <FormControl>
                  <Input type="string" placeholder="e.g., 85" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="averageSalary"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Avg. Salary</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1200000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="highestSalary"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Highest Salary</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 120000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-5 border p-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <FormField
                control={form.control}
                name={`placements.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`placements.${index}.noOfPeoplePlaced`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>No. of Students Placed</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormLabel className="block mb-1">Company Logo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  console.log(`Selected file for course ${index}:`, file);
                }}
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
            label="Add Course"
            type="button"
            className="bg-transparent hover:bg-transparent hover:text-primary-600 shadow-none"
            onClick={() =>
              append({
                name: "",
                noOfPeoplePlaced: "",
              })
            }
          />
        </div>

        <div className="w-full flex justify-end">
          <PrimaryButton type="submit" label="Next" loading={loading}/>
        </div>
      </form>
    </Form>
  );
}
