/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ApplicationStatusCard, InfoCard } from "@/components/Cards";
import { DetailRow } from "@/components/DetailRow";
import { useModifyData } from "@/hooks/useModifyData";
import { useReadData } from "@/hooks/useReadData";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, File, FileText, Loader2 } from "lucide-react";
import { SecondaryButton } from "@/components/Buttons";
import { ApplicationJoinType } from "@/types/ApplicationJoinType";
import formatApplicationData from "@/lib/DataFormatter/applicationDataFormatter";
import formatUploadedDocumentsData from "@/lib/DataFormatter/uploadedDocumentForamtter";
import { UploadedDocumentsJoinType } from "@/types/UploadedDocumentsJoinType";
import { ApplicationTypeWithId, UploadDocumentsType } from "@/types";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AboutApplication() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data, isLoading, isError, refetch } = useReadData<ApplicationJoinType[]>(
    "applications",
    `/applications/fields/many?id=${id}`
  );


  const [activeTab, setActiveTab] = useState<string>("details");

  const applicationsData = formatApplicationData(data);
  const application = applicationsData?.[0];

  const { mutate, isPending, error: updateError } = useModifyData<ApplicationTypeWithId>(`/applications`);

  console.log(application);

  const { data: uplDocData, isLoading: isDocsLoading, isError: isDocsError } = useReadData<UploadedDocumentsJoinType[]>(
    "uploadedDocuments",
    `/uploaded-documents/fields/many?applicationId=${application && application?.id}`
  );

  const uploadedDocumentsData: UploadDocumentsType[] | null = formatUploadedDocumentsData(uplDocData);

  console.log(uploadedDocumentsData);

  const [selectedStatus, setSelectedStatus] = useState(application?.status || "");

  const handleStatusChange = (newStatus: string) => setSelectedStatus(newStatus);

  const updateApplicationStatus = () => {
    if (!application) {
      toast({
        title: "An Error occurred",
        description: "Application data is missing.",
      });
      return;
    }

    mutate(
      {
        id: id ?? "",
        collegeId: application.college?.id!,
        courseId: application.course?.id!,
        userId: application.user?.id!,
        status: selectedStatus,
      },
      {
        onSuccess: () => refetch(),
        onError: () =>
          toast({
            title: "Update Failed",
            description: "Failed to update application status.",
          }),
      }
    );
  };

  if (isLoading || !application) return <h1>Loading...</h1>;
  if (isError || updateError || isDocsError) return <h1>Something went wrong</h1>;

  return (
    <div>
      <ApplicationStatusCard
        updateApplicationStatus={updateApplicationStatus}
        handleStatusChange={handleStatusChange}
        application={application}
        isUpdating={isPending}
        selectedStatus={selectedStatus}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md my-5 bg-gray-200">
          <TabsTrigger value="details" className="flex items-center gap-2 data-[state=active]:bg-white">
            <FileText className="w-4 h-4" />
            <span>Application Details</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2 data-[state=active]:bg-white">
            <File className="w-4 h-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
            <div className="md:col-span-1">
              <InfoCard title="User Information">
                <div className="space-y-1">
                  <DetailRow label="Name" value={application.user?.name} />
                  <DetailRow label="Email" value={application.user?.email} />
                  <DetailRow label="Mobile" value={application.user?.mobile} />
                  <DetailRow label="Level" value={application.user?.level} />
                  <DetailRow label="Stream" value={application.user?.stream} />
                </div>
              </InfoCard>
            </div>

            <div className="md:col-span-1">
              <InfoCard title="College Information">
                <div className="space-y-1">
                  <DetailRow label="College Name" value={application.college?.name} />
                  <DetailRow label="Location" value={application.college?.location} />
                  <DetailRow label="Rank" value={application.college?.rank} />
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700">{application.college?.description}</p>
                </div>
              </InfoCard>
            </div>

            <div className="md:col-span-1">
              <InfoCard title="Course Information">
                <div className="space-y-1">
                  <DetailRow label="Course Name" value={application.course?.courseFrame.name} />
                  <DetailRow label="Fees" value={formatCurrency(application.course?.fees || 0)} />
                  <DetailRow label="Eligibility" value={application.course?.eligibility} />
                </div>
              </InfoCard>
            </div>

            <div className="md:col-span-3">
              <InfoCard title="Educational Background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Class 10th Details</h3>
                    <div className="space-y-1">
                      <DetailRow label="Board" value={application.user?.class10Board} />
                      <DetailRow label="School" value={application.user?.class10School} />
                      <DetailRow label="Passing Year" value={application.user?.class10PassingYear} />
                      <DetailRow label="Marks Type" value={application.user?.class10MarksType} />
                      <DetailRow label="Percentage/CGPA" value={application.user?.class10PercentageOrCGPA} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Class 12th Details</h3>
                    <div className="space-y-1">
                      <DetailRow label="Board" value={application.user?.class12Board} />
                      <DetailRow label="School" value={application.user?.class12School} />
                      <DetailRow label="Passing Year" value={application.user?.class12PassingYear} />
                      <DetailRow label="Stream" value={application.user?.class12Stream} />
                      <DetailRow label="Marks Type" value={application.user?.class12MarksType} />
                      <DetailRow label="Percentage/CGPA" value={application.user?.class12PercentageOrCGPA} />
                    </div>
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="bg-white w-full shadow-sm border border-light-100 p-5">
            <h1 className="text-lg font-bold">Uploaded Documents</h1>
            <div className="h-[1px] w-full bg-light-100 my-2" />

            {isDocsLoading && (
              <div className="w-full flex justify-center py-2">
                <Loader2 className="h-7 w-7 animate-spin text-primary-main" />
              </div>
            )}

            {uploadedDocumentsData?.map((item, index) => (
              <div
                key={index}
                className="flex px-2 flex-row py-5 text-sm border-b border-light-100 justify-between items-center"
              >
                <div className="flex items-start flex-col justify-center gap-2">
                <p className="text-lg">{item.document.documentFrame?.name}</p>
                <p className="text-sm text-primary-main">{item.document.name}</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Download className="text-primary-main hover:text-primary-600" />
                  <SecondaryButton
                    label="View"
                    className="rounded-full"
                    onClick={() => {
                      console.log("Hello")
                    }}
                  />
                </div>
              </div>
            ))}

            {!isDocsLoading && uploadedDocumentsData?.length === 0 && (
              <h1 className="my-5">No Document Found</h1>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}