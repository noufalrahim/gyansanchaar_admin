import { FormItemType } from '@/constants';
import { DotSquare, Edit3 } from 'lucide-react';

interface FormItemCardProps {
  label: string;
  type: FormItemType;
};

export default function FormItemCard({
  label,
  type
}: FormItemCardProps) {
  return (
    <div className='w-full border border-primary-200 p-5 flex flex-row items-center justify-between'>
      <div className='flex flex-row gap-2'>
        <DotSquare />
        <p>{label}</p>
      </div>
      <div className='flex flex-row gap-2 items-center justify-center flex gap-7'>
        <div className='border border-primary-300 p-2 md:w-96 items-center justify-center flex '>
          <p>{type.label}</p>
        </div>
        <Edit3 />
      </div>
    </div>
  )
};
