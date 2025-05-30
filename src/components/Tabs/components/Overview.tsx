/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/Buttons";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useReadData } from "@/hooks/useReadData";
import { CollegeType } from "@/types";
import { Loader2 } from "lucide-react";

interface OverviewProps {
  onNext: (data: any) => void;
  loading: boolean;
  editItem: string | undefined;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  rank: z.string().min(1),
  description: z.string().min(2),
  coverImage: z.string().min(2),
});

export default function Overview({ onNext, loading, editItem }: OverviewProps) {
  const [uploading, setUploading] = useState(false);

  console.log(editItem);
  const { data } = useReadData<CollegeType>(
    `collegeById-${editItem}`,
    editItem ? `/colleges/${editItem}` : null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      rank: "",
      description: "",
      coverImage: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        location: data.location,
        rank: data.rank.toString(),
        description: data.description,
        coverImage: data.coverImage,
      });
    }
  }, [data, form]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    setUploading(true);

    try {
      const res = await axios.post(import.meta.env.VITE_CLOUDINARY_API, formData);
      form.setValue("coverImage", res.data.secure_url, { shouldValidate: true });
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };

  // if (isLoading) return <Loader2 className="animate-spin h-6 w-6 text-gray-600" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-row gap-5 w-full">
          {["name", "location", "rank"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as "name" | "location" | "rank"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                  <FormControl>
                    <Input placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
                  {field.value && <img src={field.value} alt="Cover Preview" className="mt-2 w-48 rounded-md" />}
                </div>
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        <div className="w-full items-end flex justify-end">
          <PrimaryButton type="submit" label="Next" loading={loading || uploading} />
        </div>
      </form>
    </Form>
  );
}
