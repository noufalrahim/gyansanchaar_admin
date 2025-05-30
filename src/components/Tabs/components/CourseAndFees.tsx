/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { CourseFrameType, CourseJoinType } from "@/types";
import { useReadData } from "@/hooks/useReadData";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import formatCourseData from "@/lib/DataFormatter/courseDataFormatter";

const courseSchema = z.object({
  courseFrameId: z.string().min(2).max(50),
  fees: z.string().min(1),
  eligibility: z.string().min(2).max(50),
});

const formSchema = z.object({
  courses: z.array(courseSchema),
});

interface CourseAndFeesProps {
  onNext: (data: any) => void;
  loading: boolean;
  editItem: string | undefined;
}

export default function CourseAndFees({ onNext, loading, editItem }: CourseAndFeesProps) {
  const { data: courseFrameData, isLoading: courseFrameIsLoading } = useReadData<CourseFrameType[]>(
    "courseFrames",
    "/course-frames"
  );

  const { data: courseData, isLoading: courseIsLoading } = useReadData<CourseJoinType[]>(
    `courseByCollegeId-${editItem}`,
    editItem ? `/courses/fields/many?collegeId=${editItem}` : null
  );

  const formattedCourseData = formatCourseData(courseData);

  console.log(courseData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courses: [
        {
          courseFrameId: "",
          fees: "",
          eligibility: "",
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: "courses",
    control: form.control,
  });

  useEffect(() => {
    if (formattedCourseData && formattedCourseData.length > 0) {
      console.log(courseData);
      replace(
        formattedCourseData.map((course) => ({
          courseFrameId: course.courseFrameId || "",
          fees: course.fees?.toString() || "",
          eligibility: course.eligibility || "",
        }))
      );
    }
  }, [courseData, replace]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };

  if(courseIsLoading) {
    return <Loader2 className="animate-spin"/>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-row gap-5 w-full items-center justify-center">
            <FormField
              control={form.control}
              name={`courses.${index}.courseFrameId`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white max-h-48">
                      {courseFrameIsLoading ? (
                        <div className="w-full flex items-center justify-center py-2 text-primary-main">
                          <Loader2 className="animate-spin" />
                        </div>
                      ) : (
                        courseFrameData?.map((course) => (
                          <SelectItem key={course.id} value={course.id!}>
                            {course.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`courses.${index}.fees`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Fees</FormLabel>
                  <FormControl>
                    <Input placeholder="Fees" {...field} type="number" />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`courses.${index}.eligibility`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Eligibility</FormLabel>
                  <FormControl>
                    <Input placeholder="Eligibility" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="self-start mt-6"
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
                courseFrameId: "",
                fees: "",
                eligibility: "",
              })
            }
          />
        </div>

        <div className="w-full flex justify-end">
          <PrimaryButton type="submit" label="Next" loading={loading} />
        </div>
      </form>
    </Form>
  );
}
