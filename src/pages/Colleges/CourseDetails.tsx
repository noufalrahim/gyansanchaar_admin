/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  DollarSign,
  GraduationCap,
  FileText,
  X,
  Plus,
  Loader2
} from 'lucide-react';
import { CourseCategoryType, CourseFrameType, CourseType, DocumentFrameType, DocumentsForCollegeType } from '@/types';
import { useReadData } from '@/hooks/useReadData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateData } from '@/hooks/useCreateData';
import { useDeleteData } from '@/hooks/useDeleteData';
import { PrimaryButton, SecondaryButton } from '@/components/Buttons';

interface CourseModalProps {
  course: {
    course_category: CourseCategoryType;
    course_frame: CourseFrameType;
    course: CourseType;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {

  if (!course) {
    return;
  }

  const { data: documentsData, isLoading: documentsDataIsLoading, refetch: refetchDocumentsData } = useReadData<{
    documents_for_college: DocumentsForCollegeType;
    document_frame: DocumentFrameType;
  }[]>('documentsForCollege', `/documents-for-colleges/fields/many?courseId=${course.course.id}&collegeId=${course.course.collegeId}`);
  const { data: documentFramesData, isLoading: documentFramesDataIsLoading } = useReadData<DocumentFrameType[]>('documentFrames', `/documents-frames`);
  const { mutate: createDocumentsForCollege, isPending: createDocumentsForCollegeIsPending } = useCreateData<DocumentsForCollegeType>('/documents-for-colleges');
  const { mutate: deleteMutate, isPending: deleteMutateIsPending } = useDeleteData('/documents-for-colleges');

  const [newDocument, setNewDocument] = useState<string>('');

  if (!course) return null;

  console.log(documentsData);

  const handleAddDocument = () => {
    if (newDocument.trim()) {
      const newDocumentForCollege: DocumentsForCollegeType = {
        collegeId: course.course.collegeId!,
        documentFrameId: newDocument,
        courseId: course.course.id!
      };

      createDocumentsForCollege(newDocumentForCollege, {
        onSuccess: () => refetchDocumentsData(),
        onError: (err) => console.log('err', err)
      })
    }
  };

  const handleRemoveDocument = (id: string) => {
    deleteMutate({
      id: id
    }, {
      onSuccess: () => refetchDocumentsData(),
      onError: (err) => console.log('err', err)
    })
  };

  if (documentsDataIsLoading || documentFramesDataIsLoading) {
    return <Loader2 className='animate-spin' />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-black">{course.course_frame.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full max-w-md my-5 bg-gray-200">
            <TabsTrigger value="details" className='flex items-center gap-2 data-[state=active]:bg-white'>Course Details</TabsTrigger>
            <TabsTrigger value="documents" className='flex items-center gap-2 data-[state=active]:bg-white'>Required Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{course.course_frame.level}</Badge>
                  <Badge variant="outline">{course.course_frame.duration}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="font-medium">{course.course_frame.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Fees:</span>
                    <span className="font-medium">{course.course.fees}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">{course.course_frame.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Comprehensive curriculum</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Industry-relevant skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Practical experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Career support</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">

                  <Select value={newDocument} onValueChange={(e) => setNewDocument(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select document" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {
                        documentFramesData && documentFramesData.map((record, index) => (
                          <SelectItem value={record.id!} key={index}>{record.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>

                  <PrimaryButton label='Add' onClick={handleAddDocument} leadIcon={<Plus />} loading={createDocumentsForCollegeIsPending} />
                </div>

                <div className="space-y-3">
                  {documentsData && documentsData.map((doc) => (
                    <div key={doc.documents_for_college.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{doc.document_frame.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <SecondaryButton label='Remove' loading={deleteMutateIsPending} leadIcon={<X />} onClick={() => handleRemoveDocument(doc.documents_for_college.id!)} />
                      </div>
                    </div>
                  ))}
                </div>

                {documentsData && documentsData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No document requirements added yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};