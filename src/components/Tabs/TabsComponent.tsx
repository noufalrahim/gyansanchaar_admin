import { TABS_TRIGGER_VALUES } from "@/constants/TABS_TRIGGER";
import { TabsContent } from "../ui/tabs";
import { CollegeType } from "@/types";
// import { Admission, Campus, CourseAndFees, Overview, Placements } from "./components";

interface TabsComponentProps {
  college: CollegeType;
}

export default function TabsComponent({ college }: TabsComponentProps) {

  console.log(college);

  return (
    <div className="h-[500px]">
      <TabsContent value={TABS_TRIGGER_VALUES.OVERVIEW} className="">
        {/* <Overview />
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.COURSES} className="">
        <CourseAndFees />
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.ADMISSION} className="">
        <Admission />
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.PLACEMENTS} className="">
        <Placements />
      </TabsContent>
      <TabsContent value={TABS_TRIGGER_VALUES.CAMPUS} className="">
        <Campus /> */}
      </TabsContent>
    </div>
  )
};
