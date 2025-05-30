import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { PrimaryButton, SecondaryButton } from '@/components/Buttons';
  import { Calendar, MapPin } from 'lucide-react';
  
export default function EventCard() {
  return (
    <Card>
    <CardHeader className='flex gap-3 p-4'>
      <img className='rounded-md' src='https://img.freepik.com/free-vector/modern-music-event-poster-template_1361-1292.jpg' />
      <CardTitle className='text-xl'>Conference Event</CardTitle>
      <CardDescription className='flex justify-between items-center flex-row w-full'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <Calendar size={18} />
          <p>29-30 Feb</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-2'>
          <MapPin size={18} />
          <p>Grand Hyatt Kochi</p>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <CardDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisi ante, lobortis in ipsum et, dapibus consectetur velit. Nullam dictum, lacus id volutpat ultrices, metus
      </CardDescription>
    </CardContent>
    <CardFooter className='w-full gap-5 flex'>
      <SecondaryButton label='Edit Conference' className='w-full' />
      <PrimaryButton label='View Conference' className='w-full' />
    </CardFooter>
  </Card>
  )
}
