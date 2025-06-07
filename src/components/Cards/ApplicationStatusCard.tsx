import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { format } from "date-fns";
import { statusMap } from "@/lib/BadgeGenerator";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "../Buttons";
import { StatusType } from "@/types/StatusType";
import { FormattedApplicationType } from "@/lib/DataFormatter";

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "PPP");
};

interface ApplicationStatusCardInterface {
  updateApplicationStatus: (status: string) => void;
  application: FormattedApplicationType;
  isUpdating: boolean;
  selectedStatus: string;
  handleStatusChange: (newStatus: string) => void;
};

export default function ApplicationStatusCard({
  updateApplicationStatus,
  application,
  isUpdating,
  selectedStatus,
  handleStatusChange
}: ApplicationStatusCardInterface) {
  // const { toast } = useToast();
  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded-lg shadow-sm border border-light-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">
            Application #{application.id!}
          </h2>
          <div className="mt-3 flex items-center space-x-3">
            <div className={cn('items-center justify-center flex py-1 px-5 rounded-full', statusMap[application.status as keyof typeof statusMap].color)}>
              <p className="text-sm">{statusMap[application.status as keyof typeof statusMap].label}</p>
            </div>
            <span className="text-sm text-gray-500">
              Created on {formatDate(application.createdAt!)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value={StatusType.Application.ApplicationFormVerified}>Verify Application</SelectItem>
              <SelectItem value={StatusType.Application.ApplicationFormRejected}>Reject Application</SelectItem>
              <SelectItem value={StatusType.Documents.DocumentVerified}>Verify Documents</SelectItem>
              <SelectItem value={StatusType.Documents.DocumentVerificationRejected}>Reject Documents</SelectItem>
              <SelectItem value={StatusType.Admission.AdmissionLetterOffered}>Offer Admission Letter</SelectItem>
            </SelectContent>
          </Select>

          <PrimaryButton label={isUpdating ? "Updating..." : "Update"} loading={isUpdating} disabled={selectedStatus === application.status || isUpdating} onClick={() => updateApplicationStatus(selectedStatus as string)} />
        </div>
      </div>
    </div>

  )
};
