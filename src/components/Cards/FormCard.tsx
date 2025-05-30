import { FormItemCard } from '@/components/Cards'
import { PrimaryButton } from '../Buttons'

interface FormCardInterface {
  setOpen: (open: true) => void;
};

export default function FormCard({setOpen}:FormCardInterface) {
  return (
    <div className='w-full border border-dashed border-[2px] border-primary-300 p-5 gap-5 flex flex-col'>
      <div>
        <h1 className='font-bold text-lg'>Selected Forms</h1>
        <p className='text-sm'>Details to be collected from the participants at the time of registration (Name & Email ID are always required).</p>
      </div>
      <div className='flex gap-3 flex-col'>
        <FormItemCard label='Name' type={{
          label: 'Text',
          value: 'text',
        }} />
        <FormItemCard label='Email' type={{
          label: 'Email',
          value: 'email',
        }}  />
      </div>
      <div className='flex w-full justify-end'>
        <PrimaryButton label='Add Form' onClick={() => setOpen(true)}/>
      </div>
    </div>
  )
};