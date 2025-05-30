import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/Buttons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CourseFrameType } from "@/types"
import { useCreateData } from "@/hooks/useCreateData"

interface CourseFormProps {
    setOpen: (open: boolean) => void;
    refetch: () => void;
}

export default function CourseForm({ setOpen, refetch }: CourseFormProps) {

    // const { mutate: editMutate, isPending: editIsPending, isError: editIsError } = useModifyData<CourseFrameTypeWithId>('/course-frames');
    const { mutate: createMutate, isPending: createIsPending } = useCreateData<CourseFrameType>('/course-frames');

    const formSchema = z.object({
        course: z.string().max(50),
        duration: z.string().max(50),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        createMutate({
            name: values.course,
            duration: values.duration,
        }, {
            onSuccess: () => {
                console.log("Success");
                setOpen(false);
                refetch();
            },
            onError: (err) => {
                console.log("Err", err);
            }
        })
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Course Name" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`duration`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Duration" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white max-h-48">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <SelectItem key={i} value={(i + 1).toString()}>
                                            {i + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-600" />
                        </FormItem>
                    )}
                />
                <div className="w-full items-end flex justify-end">
                    <PrimaryButton type="submit" label="Submit" className="w-full" loading={createIsPending} />
                </div>
            </form>
        </Form>
    )
}
