import { columns } from "@/columns/CoursesColumn";
import { AppBar } from "@/components/AppBar";
import { PrimaryButton } from "@/components/Buttons";
import { DialogModal } from "@/components/Modal";
import { TableComponent } from "@/components/Table";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseForm from "./form/Form";
import { CourseFrameType } from "@/types";
import { useReadData } from "@/hooks/useReadData";


export default function Courses() {

    const [open, setOpen] = useState<boolean>(false);

    const { data, isLoading, isError, refetch } = useReadData<CourseFrameType[]>('courseFrames', '/course-frames');
    
    return (
        <div>
            <AppBar title='Courses' description='Manage all your courses here'>
                <PrimaryButton onClick={() => setOpen(true)} label='Add Course' leadIcon={<Plus />} />
            </AppBar>
            {
                isLoading && (
                    <div>
                        <p>Loading...</p>
                    </div>
                )
            }
            {
                isError && (
                    <div>
                        <p>An error occured!</p>
                    </div>
                )
            }
            <TableComponent columns={columns} data={data} filterColumn={'course'} />
            <DialogModal title="Course" description="Add a new course" open={open} setOpen={setOpen}>
                <CourseForm setOpen={setOpen} refetch={refetch}/>
            </DialogModal>
        </div>
    )
};
