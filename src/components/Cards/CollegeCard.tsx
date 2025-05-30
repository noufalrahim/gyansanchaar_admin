import { GraduationCap, MapPin, Trash2 } from 'lucide-react'
import { PrimaryButton } from '../Buttons';
import { CollegeType } from '@/types';
import { slicer } from '@/lib/Slicer';

interface CollegeCardProps {
    college: CollegeType,
    setEditItem: (editItem: string) => void;
    setOpen: (open: boolean) => void;
    setDeleteItem: (deleteItem: string) => void;
    setOpenDeleteModal: (open: boolean) => void;
};

export default function CollegeCard({ college,
    // , setEditItem, setOpen, 
setDeleteItem, setOpenDeleteModal }: CollegeCardProps) {

    return (
        <div className='shadow-sm border border-light-100 rounded-md bg-white w-full justify-between p-5 flex gap-5 flex-col'>
            <img className='rounded-md' src={college.coverImage} />
            <div className='gap-3 flex flex-col'>
                <p className='text-primary-main text-xl font-bold'>{college.name}</p>
                <div className='text-light-200 flex flex-row items-center text-center gap-2 text-md'>
                    <MapPin size={16} />
                    <p>{college.location}</p>
                </div>
                <p className='text-light-200 text-sm'>{slicer(college.description, 70)}</p>
                <div className='w-full flex flex-row justify-between items-center'>
                    <div className='text-primary-main flex flex-row gap-2 justify-between items-center'>
                        <GraduationCap size={20} />
                        <p className='text-black'>Rank: #{college.rank}</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-row gap-2'>
                <PrimaryButton label='Delete College' onClick={() => {
                    setDeleteItem(college.id!)
                    setOpenDeleteModal(true);
                }} className='bg-red-600 w-full hover:bg-red-700' leadIcon={<Trash2 />}/>
                {/* <PrimaryButton label='Edit College' onClick={() => {
                    setEditItem(college.id!)
                    setOpen(true)    
                }} className='w-full' leadIcon={<Edit3 />}/> */}
            </div>
        </div>
    )
}
