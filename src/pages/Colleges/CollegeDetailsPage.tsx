/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { useReadData } from '@/hooks/useReadData';
import {
  CollegeType, CourseCategoryType, CourseFrameType, CourseType,
  FactsAndStatisticType, FormFieldSchema, LocationType, SnapshotType
} from '@/types';
import {
  BookOpen, Clock, DollarSign, Loader2, MapPin,
  Pencil
} from 'lucide-react';
import CourseModal from './CourseDetails';
import { GeneralizedModalForm } from '@/components/Form';
import { useCreateData } from '@/hooks/useCreateData';
import { TableComponent } from '@/components/Table';
import { columns as snapshotColumns } from "@/columns/SnapshotColumn";
import { columns as factsColumns } from "@/columns/FactsColumn";
import { useModifyData } from '@/hooks/useModifyData';
import { PrimaryButton } from '@/components/Buttons';
import { DialogModal } from '@/components/Modal';
import { Overview } from '@/components/Tabs/components';

const snapshotSchema: FormFieldSchema[] = [
  { name: "label", label: "Snapshot Label", type: "text", placeholder: "Eg: Founded", validation: { required: true, maxLength: 50 } },
  { name: "value", label: "Snapshot Value", type: "text", placeholder: "Eg: 1848", validation: { required: true, maxLength: 50 } }
];

const factsAndStatisticsSchema: FormFieldSchema[] = [
  { name: "label", label: "Facts Label", type: "text", placeholder: "Eg: Popular Program", validation: { required: true, maxLength: 50 } },
  { name: "value", label: "Facts Value", type: "text", placeholder: "Eg: B.Tech", validation: { required: true, maxLength: 50 } }
];

export default function CollegeDetailsPage() {
  const { id } = useParams();
  const [openSnapshot, setOpenSnapshot] = useState<boolean>(false);
  const [openFacts, setOpenFacts] = useState<boolean>(false);
  const [openCollegeEdit, setOpenCollegeEdit] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [selectedCourse, setSelectedCourse] = useState<{
    course_category: CourseCategoryType;
    course_frame: CourseFrameType;
    course: CourseType;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: collegeData, isLoading: collegeDataIsLoading, refetch: refetchCollegeData } = useReadData<{ college: CollegeType, location: LocationType }[]>(
    'collegeDetails', `/colleges/fields/many?id=${id}`
  );

  const { data: courseData, isLoading: courseDataIsLoading } = useReadData<{
    course_frame: CourseFrameType;
    course_category: CourseCategoryType;
    course: CourseType;
  }[]>('coursesByCollege', `/courses/fields/many?collegeId=${id}`);
  const { mutate: editCollegeMutate, isPending: editCollegeMutateIsPending } = useModifyData<CollegeType>('/colleges');

  const { data: snapshotData, isLoading: snapshotLoading, refetch: refetchSnapshots } =
    useReadData<SnapshotType[]>('instituteSnapshots', '/institute-snapshots');

  const { data: factsData, isLoading: factsLoading, refetch: refetchFacts } =
    useReadData<FactsAndStatisticType[]>('factsAndStatistics', '/facts-and-statistics');

  const { mutate: createSnapshot, isPending: isCreatingSnapshotPending } = useCreateData<SnapshotType>('/institute-snapshots');
  const { mutate: editSnapshot, isPending: isEditSnapshotPending } = useModifyData<SnapshotType>('/institute-snapshots');

  const { mutate: createFacts, isPending: isCreatingFactPending } = useCreateData<FactsAndStatisticType>('/facts-and-statistics');
  const { mutate: editFacts, isPending: isEditFactsPending } = useModifyData<FactsAndStatisticType>('/facts-and-statistics');

  const college = collegeData?.[0];

  const loading = collegeDataIsLoading || courseDataIsLoading || snapshotLoading || factsLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <Loader2 className="animate-spin w-6 h-6 text-gray-700" />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h1>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }


  const handleSubmit = (type: 'snapshot' | 'fact') => (formData: Record<string, string>) => {
    const isEdit = !!selectedItem?.id;

    const data = {
      ...formData,
      ...(isEdit ? { id: selectedItem.id } : {}),
      iconName: selectedItem?.iconName || 'Info',
      collegeId: college.college.id,
    } as SnapshotType & FactsAndStatisticType;

    const mutateFn =
      type === 'snapshot'
        ? isEdit ? editSnapshot : createSnapshot
        : isEdit ? editFacts : createFacts;

    const refetchFn = type === 'snapshot' ? refetchSnapshots : refetchFacts;

    mutateFn(data, {
      onSuccess: () => {
        refetchFn();
        setSelectedItem(null);
      },
      onError: (err: any) => console.error(err),
    });
  };




  const handleCourseClick = (course: typeof selectedCourse) => {
    setSelectedCourse(course);
    setTimeout(() => setIsModalOpen(true), 0);
  };

  const handleEditCollege = (values: CollegeType) => {
    console.log(values);
    editCollegeMutate({
      ...values,
      id: college.college.id
    }, {
      onSuccess: () => {
        refetchCollegeData();
        setOpenCollegeEdit(false);
      },
      onError: (err) => console.error('err', err)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between flex-row">
          <div className='flex items-center gap-4 mb-6'>
            <img src={college.college.coverImage} alt={college.college.name} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold">{college.college.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{college.location.place}, {college.location.state}</span>
                <Badge variant="secondary">Rank #{college.college.rank}</Badge>
              </div>
            </div>
          </div>
          <div className='hover:bg-gray-200 rounded-full p-2 cursor-pointer'>
            <Pencil onClick={() => setOpenCollegeEdit(true)}/>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{college.college.description}</p>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid grid-cols-2 bg-gray-200 mb-6">
            <TabsTrigger value="courses" className="data-[state=active]:bg-white flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="snapshots" className="data-[state=active]:bg-white flex items-center gap-2">
              <Clock className="h-4 w-4" /> Snapshots
            </TabsTrigger>
            {/* <TabsTrigger value="details" className="data-[state=active]:bg-white flex items-center gap-2">
              <Info className="h-4 w-4" /> Details
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2 items-center"><BookOpen className="w-5 h-5" /> Available Courses</CardTitle>
                <CardDescription>Click any course for more details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseData?.map((record) => (
                  <Card
                    key={record.course.id}
                    className="cursor-pointer hover:shadow-md"
                    onClick={() => handleCourseClick(record)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{record.course_frame.name}</CardTitle>
                      <Badge variant="outline">{record.course_frame.level}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{record.course_frame.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>{record.course.fees}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{record.course_frame.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>General College Details</CardTitle>
                <CardDescription>Additional fields like accreditation, founder, etc. can go here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">More details to be added...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="snapshots">
            <div className="flex flex-col gap-5 items-center">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-primary-main text-xl font-semibold">Snapshots</p>
                  <PrimaryButton onClick={() => {
                    setSelectedItem(null);
                    setOpenSnapshot(true);
                  }}
                    label='Add Snapshot'
                  />
                </div>
                <TableComponent
                  columns={snapshotColumns}
                  data={snapshotData}
                  filterColumn="label"
                  onClickDelete={() => { }}
                  onClickEdit={(item) => {
                    setSelectedItem(item);
                    setTimeout(() => setOpenSnapshot(true), 0);
                  }}
                />
              </div>

              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-primary-main text-xl font-semibold">Facts and Statistics</p>
                  <PrimaryButton onClick={() => {
                    setSelectedItem(null);
                    setOpenFacts(true);
                  }}
                    label='Add Facts'
                  />

                </div>
                <TableComponent
                  columns={factsColumns}
                  data={factsData}
                  filterColumn="label"
                  onClickDelete={() => { }}
                  onClickEdit={(item) => {
                    setSelectedItem(item);
                    setTimeout(() => setOpenFacts(true), 0);
                  }}
                />
              </div>
            </div>
          </TabsContent>

        </Tabs>

        <CourseModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
        />
        <GeneralizedModalForm
          open={openSnapshot}
          setOpen={setOpenSnapshot}
          schema={snapshotSchema}
          onSubmit={handleSubmit('snapshot')}
          title="Institute Snapshot"
          description="Add a new snapshot"
          loading={isCreatingSnapshotPending || isEditSnapshotPending}
          editItem={selectedItem}
        />
        <GeneralizedModalForm
          open={openFacts}
          setOpen={setOpenFacts}
          schema={factsAndStatisticsSchema}
          onSubmit={handleSubmit('fact')}
          title="Facts and Statistics"
          description="Add new facts/statistics"
          loading={isCreatingFactPending || isEditFactsPending}
          editItem={selectedItem}
        />
         <DialogModal open={openCollegeEdit} setOpen={setOpenCollegeEdit} title='Edit College' description='Edit college here' className='max-w-7xl'>
          <Overview onNext={handleEditCollege} editItem={college.college.id} loading={editCollegeMutateIsPending}/>
         </DialogModal>
      </div>
    </div>
  );
}
