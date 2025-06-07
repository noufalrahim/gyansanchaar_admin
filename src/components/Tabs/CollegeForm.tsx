/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Campus,
  CourseAndFees,
  FactsAndStatistics,
  InstituteSnapshot,
  Overview,
  Placements,
} from "./components";
import { useCreateData } from "@/hooks/useCreateData";
import { CollegeType, PlacementCompanyType, PlacementType, SnapshotType } from "@/types";
import { CourseType } from "@/types/CourseType";
import { FactsAndStatisticType } from "@/types/FactsAndStatisticType";
import { GalleryType } from "@/types/GalleryType";
import { useModifyData } from "@/hooks/useModifyData";

const steps = ["Overview", "Course & Fees", "Institute Snapshots", "Facts & Statistics", "Placements", "Campus"];

interface CollegeFormProps {
  collegeDataRefetch: () => void;
  editItem: string | undefined;
};

export default function CollegeForm({ collegeDataRefetch, editItem }: CollegeFormProps) {
  const [step, setStep] = useState(0);

  const [collegeData, setCollegeData] = useState<CollegeType>();

  const { mutate: createCollegeMutate, isPending: createCollegeIsPending } = useCreateData<CollegeType>('/colleges');
  const { mutate: updateCollegeMutate, isPending: updateCollegeIsPending } = useModifyData<CollegeType>('/colleges');

  const { mutate: createCourseMutate, isPending: createCourseIsPending } = useCreateData<CourseType[]>('/courses/many');
  // const { mutate: updateCourseMutate, 
  //   isPending: updateCourseIsPending 
  // } = useModifyData<CourseType>('/courses');

  const { mutate: createSnapshotMutate, isPending: createSnapshotIsPending } = useCreateData<SnapshotType[]>('/institute-snapshots/many');
  // const { mutate: updateSnapshotMutate, isPending: updateSnapshotIsPending } = useModifyData<SnapshotWithIdType>('/courses');

  const { mutate: createFactsMutate, isPending: createFactsIsPending } = useCreateData<FactsAndStatisticType[]>('/facts-and-statistics/many');
  const { mutate: createPlacementMutate, isPending: createPlacementIsPending } = useCreateData<PlacementType>('/placements');
  const { mutate: createPlacementCompaniesMutate, isPending: createPlacementCompanyIsPending } = useCreateData<PlacementCompanyType[]>('/placement-companies/many');
  const { mutate: createGalleryMutate, isPending: createGalleryIsPending } = useCreateData<GalleryType[]>('/galleries/many')

  const handleOverviewNext = (data: any) => {
    console.log(editItem);
    console.log(data);
    if(!editItem) {
    createCollegeMutate(data, {
      onSuccess: (data) => {
        console.log("Data Entered Successfully", data);
        setStep(1);
        setCollegeData(data);
        collegeDataRefetch();
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    })
  } 
  else {
    updateCollegeMutate({
      id: editItem,
      ...data
    }, {
      onSuccess: (data) => {
        console.log("Data updated Successfully", data);
        setStep(1);
        collegeDataRefetch();
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    })
  }
  };

  const handleCourseNext = (data: {
    courses: CourseType[];
  }) => {
    console.log(data);
    const courseWithCollegeId = data.courses.map((course: CourseType) => ({
      collegeId: collegeData?.id,
      ...course
    }));

    if(editItem) {
      // if (editItem) {
      //   updateCourseMutate(
      //     {
      //       collegeId: collegeData?.id,
      //       courses: courseWithCollegeId,
      //     },
      //     {
      //       onSuccess: (data) => {
      //         console.log("Data updated", data);
      //         setStep(2);
      //       },
      //       onError: (err) => {
      //         console.log("An error occurred", err);
      //       },
      //     }
      //   );
      // }
  }else{
    createCourseMutate(courseWithCollegeId, {
      onSuccess: (data) => {
        console.log("Courses Entered Successfully", data);
        setStep(2);
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    });
  }
  };

  const handleInstituteSnapshotNext = (data: {
    snapshots: SnapshotType[];
  }) => {
    // setInstituteSnapshotData(data);
    const updatedSnapshots = data.snapshots.map((snapshot: SnapshotType) => ({
      ...snapshot,
      collegeId: collegeData!.id!,
      iconName: 'Building',
    }))
    // setStep(3);
    createSnapshotMutate(updatedSnapshots, {
      onSuccess: (data) => {
        console.log("Snapshots Entered Successfully", data);
        setStep(3);
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    });
  };

  const handleFactsAndStatisticsNext = (data: {
    facts: FactsAndStatisticType[];
  }) => {
    // setFactsAndStatisticsData(data);
    const updatedFacts = data.facts.map((facts: FactsAndStatisticType) => ({
      ...facts,
      collegeId: collegeData!.id!,
    }))
    createFactsMutate(updatedFacts, {
      onSuccess: (data) => {
        console.log("Facts Entered Successfully", data);
        setStep(4);
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    });
  };

  const handlePlacementsNext = (data: PlacementType) => {
    console.log(data);
    // setStep(5);
    const updatedPlacementData: PlacementType = {
      collegeId: collegeData?.id!,
      averageSalary: parseInt(data.averageSalary.toString()),
      highestSalary: parseInt(data.highestSalary.toString()),
      noOfStudentsPlaced: parseInt(data.noOfStudentsPlaced.toString()),
      placementRate: data.placementRate,
    }
    createPlacementMutate(updatedPlacementData, {
      onSuccess: () => {
        const placementCompaniesData: PlacementCompanyType[] = (data.placements || []).map((plcmpny) => ({
          collegeId: collegeData?.id!,
          name: plcmpny.name
        }));
        console.log(placementCompaniesData);
        createPlacementCompaniesMutate(placementCompaniesData, {
          onSuccess: (data) => {
            console.log("Entered Succesfully", data);
            setStep(5);
          },
          onError: (err) => {
            console.log("Err", err);
          }
        })
      },
      onError: (err) => {
        console.log("An error occured", err);
      }
    })
  };

  const handleCampusSubmit = (data: {
    Campus: string;
    images: string[];
  }) => {
    console.log(data);
    const updatedGallery = data.images.map((img) => ({
      collegeId: collegeData?.id! || 'be46f71d-d308-4a7b-ad37-0f321f0c3606',
      imageUrl: img,
    }));

    console.log(updatedGallery);
    // const finalData = {
    //   ...overviewData,
    //   ...courseData,
    //   ...admissionData,
    //   ...placementsData,
    //   ...instituteSnapshotData,
    //   ...factsAndStatisticsData,
    //   ...data,
    // };
    // console.log("finalData", finalData);
    createGalleryMutate(updatedGallery, {
      onSuccess: () => {
        console.log("Uploaded");
      },
      onError: (err) => {
        console.log('An error occured', err)
      }
    })
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        {steps.map((label, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`h-2 rounded-full mb-2 ${index <= step ? "bg-blue-600" : "bg-gray-300"
                }`}
            ></div>
            <div
              className={`text-sm ${index === step ? "font-bold text-blue-700" : "text-gray-600"
                }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {step === 0 && <Overview onNext={handleOverviewNext} loading={createCollegeIsPending || updateCollegeIsPending} editItem={editItem}/>}
      {step === 1 && <CourseAndFees onNext={handleCourseNext} loading={createCourseIsPending} editItem={editItem}/>}
      {step === 2 && <InstituteSnapshot onNext={handleInstituteSnapshotNext} loading={createSnapshotIsPending} editItem={editItem}/>}
      {step === 3 && <FactsAndStatistics onNext={handleFactsAndStatisticsNext} loading={createFactsIsPending} />}
      {step === 4 && <Placements onNext={handlePlacementsNext} loading={createPlacementCompanyIsPending || createPlacementIsPending} />}
      {step === 5 && <Campus onSubmit={handleCampusSubmit} collegeDataRefetch={collegeDataRefetch} loading={createGalleryIsPending}/>}
    </div>
  );
}
