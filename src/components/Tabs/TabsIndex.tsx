import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TABS_TRIGGER } from "@/constants/TABS_TRIGGER";
import TabsComponent from "./TabsComponent";
import { CollegeType } from "@/types";

interface TabsIndexProps {
  college: CollegeType;
};

export default function TabsIndex({ college }: TabsIndexProps) {

  return (
    <Tabs defaultValue="overview" className="mt-2">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 bg-gray-200">
        {
          TABS_TRIGGER.map((trigger, index) => (
            <TabsTrigger
              value={trigger.value}
              key={index}
              className="flex items-center gap-1 data-[state=active]:bg-white"
            >
              <trigger.icon className="h-4 w-4" />
              <span className="hidden md:inline">{trigger.label}</span>
            </TabsTrigger>
          ))
        }
      </TabsList>
      <TabsComponent college={college}/>
    </Tabs>
  )
}
