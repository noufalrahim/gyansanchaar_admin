/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Admission,
  Campus,
  CourseAndFees,
  FactsAndStatistics,
  InstituteSnapshot,
  Overview,
  Placements,
} from "./components";
import { useCreateData } from "@/hooks/useCreateData";
import { AdmissionCriteriaType, CollegeType, PlacementCompanyType, PlacementType, SnapshotType } from "@/types";
import { CourseType } from "@/types/CourseType";
import { FactsAndStatisticType } from "@/types/FactsAndStatisticType";
import { AdmissionType } from "@/types/AdmissionType";
import { GalleryType } from "@/types/GalleryType";

const steps = ["Overview", "Course & Fees", "Institute Snapshots", "Facts & Statistics", "Admission", "Placements", "Campus"];

interface CollegeFormProps {
  collegeDataRefetch: () => void;
  editItem: string | undefined;
};

export default function CollegeForm({ collegeDataRefetch, editItem }: CollegeFormProps) {
  const [step, setStep] = useState(0);
  // const [overviewData, setOverviewData] = useState<Record<string, any> | null>({});
  // const [courseData, setCourseData] = useState<Record<string, any> | null>({});
  // const [instituteSnapshotData, setInstituteSnapshotData] = useState<Record<string, any> | null>({});
  // const [factsAndStatisticsData, setFactsAndStatisticsData] = useState<Record<string, any> | null>({});
  // const [admissionData, setAdmissionData] = useState<Record<string, any> | null>({});
  // const [placementsData, setPlacementsData] = useState<Record<string, any> | null>({});
  const [collegeData, setCollegeData] = useState<CollegeType>();

  const { mutate: createCollegeMutate, isPending: createCollegeIsPending } = useCreateData<CollegeType>('/colleges');
  // const { mutate: updateCollegeMutate, isPending: updateCollegeIsPending } = useModifyData<CollegeTypeWithId>('/colleges');

  const { mutate: createCourseMutate, isPending: createCourseIsPending } = useCreateData<CourseType[]>('/courses/many');
  // const { mutate: updateCourseMutate, isPending: updateCourseIsPending } = useModifyData<CourseTypeWithId>('/courses');

  const { mutate: createSnapshotMutate, isPending: createSnapshotIsPending } = useCreateData<SnapshotType[]>('/institute-snapshots/many');
  // const { mutate: updateSnapshotMutate, isPending: updateSnapshotIsPending } = useModifyData<SnapshotWithIdType>('/courses');

  const { mutate: createFactsMutate, isPending: createFactsIsPending } = useCreateData<FactsAndStatisticType[]>('/facts-and-statistics/many');
  const { mutate: createAdmissionCriteriaMutate, isPending: createAdmissionCriteriaIsPending } = useCreateData<AdmissionCriteriaType[]>('/admission-criterias/many');
  const { mutate: createAdmissionMutate, isPending: createAdmissionIsPending } = useCreateData<AdmissionType>('/admissions');
  const { mutate: createPlacementMutate, isPending: createPlacementIsPending } = useCreateData<PlacementType>('/placements');
  const { mutate: createPlacementCompaniesMutate, isPending: createPlacementCompanyIsPending } = useCreateData<PlacementCompanyType[]>('/placement-companies/many');
  const { mutate: createGalleryMutate, isPending: createGalleryIsPending } = useCreateData<GalleryType[]>('/galleries/many')

  const handleOverviewNext = (data: any) => {
    console.log(editItem);
    // setOverviewData(data);
    console.log(data);
    if(!editItem) {
    createCollegeMutate(data, {
      onSuccess: (data) => {
        console.log("Data Entered Successfully", data);
        setStep(1);
        setCollegeData(data);
      },
      onError: (error) => {
        console.log("Error occured", error);
      }
    })
  } 
  else {
    // console.log("here");
    // updateCollegeMutate({
    //   id: editItem,
    //   ...data
    // }, {
    //   onSuccess: (data) => {
    //     console.log("Data updated Successfully", data);
    //     setStep(1);
    //   },
    //   onError: (error) => {
    //     console.log("Error occured", error);
    //   }
    // })
  }
  };

  const handleCourseNext = (data: {
    courses: CourseType[];
  }) => {
    console.log(data);
    // setCourseData(data);
    const courseWithCollegeId = data.courses.map((course: CourseType) => ({
      collegeId: collegeData?.id,
      ...course
    }));

    if(editItem) {
    //   updateCourseMutate({
    //     id: editItem,
    //     ...courseWithCollegeId
    //   },
    //   {
    //     onSuccess: (data) => {
    //       console.log("Data updated", data);
    //       setStep(2);
    //     },
    //     onError: (err) => {
    //       console.log("An err occ", err);
    //     }
    //   }
    // )
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

  const handleAdmissionNext = (data: {
    admissions: AdmissionType[];
  }) => {
    // setAdmissionData(data);
    data.admissions.forEach((adm) => {
      const updatedAdm: AdmissionType = {
        title: adm.title,
        collegeId: collegeData?.id!
      }
      console.log(adm.criteria)
      console.log(updatedAdm);
      createAdmissionMutate(updatedAdm, {
        onSuccess: (data) => {
          if (adm.criteria && adm.criteria.length > 0) {
            const updatedAdmCriteria = adm.criteria.map((admCri: AdmissionCriteriaType) => ({
              collegeId: collegeData!.id!,
              admissionId: data.id!,
              criteria: admCri
            }));

            createAdmissionCriteriaMutate(updatedAdmCriteria as unknown as AdmissionCriteriaType[], {
              onSuccess: (data) => {
                console.log("Data Entered", data);
                setStep(5);
              },
              onError: (err) => {
                console.log("Error occured", err);
              }
            })
          }
        },
        onError: (err) => {
          console.log("error, ", err);
        }
      })
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
            setStep(6);
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

      {step === 0 && <Overview onNext={handleOverviewNext} loading={createCollegeIsPending} editItem={editItem}/>}
      {step === 1 && <CourseAndFees onNext={handleCourseNext} loading={createCourseIsPending} editItem={editItem}/>}
      {step === 2 && <InstituteSnapshot onNext={handleInstituteSnapshotNext} loading={createSnapshotIsPending} editItem={editItem}/>}
      {step === 3 && <FactsAndStatistics onNext={handleFactsAndStatisticsNext} loading={createFactsIsPending} />}
      {step === 4 && <Admission onNext={handleAdmissionNext} loading={createAdmissionCriteriaIsPending || createAdmissionIsPending} />}
      {step === 5 && <Placements onNext={handlePlacementsNext} loading={createPlacementCompanyIsPending || createPlacementIsPending} />}
      {step === 6 && <Campus onSubmit={handleCampusSubmit} collegeDataRefetch={collegeDataRefetch} loading={createGalleryIsPending}/>}
    </div>
  );
}
