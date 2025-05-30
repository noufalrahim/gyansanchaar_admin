import { AppBar } from '@/components/AppBar';
import { PrimaryButton } from '@/components/Buttons';
import { CollegeCard } from '@/components/Cards'
import { DialogModal } from '@/components/Modal';
import { CollegeForm } from '@/components/Tabs';
import { useDeleteData } from '@/hooks/useDeleteData';
import { useReadData } from '@/hooks/useReadData';
import { CollegeType } from '@/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';


// const collegesData: CollegeType[] = [
//   {
//     name: 'IIT Madras',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mauris sodales orci vehicula malesuada. Nullam cursus eros sit amet metus luctus pharetra. Aliquam lacus dolor, placerat sed turpis vel, rhoncus ullamcorper lorem. In vestibulum nisl posuere leo lacinia gravida. Pellentesque sed lacinia urna. Quisque id elit ornare, accumsan diam at, pharetra odio. Pellentesque ac velit nec velit ornare lacinia sed eget nisl. Nam et magna lorem.',
//     location: 'Chennai, Madras',
//     rank: '1',
//   },
//   {
//     name: 'IIT Bombay',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mauris sodales orci vehicula malesuada. Nullam cursus eros sit amet metus luctus pharetra. Aliquam lacus dolor, placerat sed turpis vel, rhoncus ullamcorper lorem. In vestibulum nisl posuere leo lacinia gravida. Pellentesque sed lacinia urna. Quisque id elit ornare, accumsan diam at, pharetra odio. Pellentesque ac velit nec velit ornare lacinia sed eget nisl. Nam et magna lorem.',
//     location: 'Bombay',
//     rank: '2',
//   },
//   {
//     name: 'IIT Delhi',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mauris sodales orci vehicula malesuada. Nullam cursus eros sit amet metus luctus pharetra. Aliquam lacus dolor, placerat sed turpis vel, rhoncus ullamcorper lorem. In vestibulum nisl posuere leo lacinia gravida. Pellentesque sed lacinia urna. Quisque id elit ornare, accumsan diam at, pharetra odio. Pellentesque ac velit nec velit ornare lacinia sed eget nisl. Nam et magna lorem.',
//     location: 'Delhi',
//     rank: '3',
//   }
// ];

export default function Colleges() {

  const [open, setOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<string | undefined>(undefined);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<string | undefined>(undefined);

  const { data: collegesData, isLoading: collegesDataIsLoading, isError: collegeDataIsError, refetch: collegeDataRefetch } = useReadData<CollegeType[]>('collegesData', '/colleges');
  const { mutate: collegeDeleteMutate, isPending: collegeDeleteMutateIsPending } = useDeleteData(`/colleges/${deleteItem}`);

  const handleDelete = () => {
    collegeDeleteMutate(undefined, {
      onSuccess: () => {
        console.log("Deleted");
        collegeDataRefetch();
        setOpenDeleteModal(false);
      },
      onError: () => {
        console.log("Error");
      }
    })
  };

  return (
    <div>
      <AppBar title='Colleges' description='Manage all your colleges here'>
        <PrimaryButton
          onClick={() => {
            setEditItem(undefined);
            setTimeout(() => setOpen(true), 220);
          }}
          label='Add College'
          leadIcon={<Plus />}
        />
      </AppBar>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
        {collegesDataIsLoading && <div>Loading...</div>}
        {collegeDataIsError && <div>Error Occured</div>}
        {(!collegesData || collegesData.length === 0) && <div>No Colleges Found</div>}
        {
          collegesData && collegesData.map((clg, index) => (
            <CollegeCard college={clg} key={index} setEditItem={setEditItem} setOpen={setOpen} setDeleteItem={setDeleteItem} setOpenDeleteModal={setOpenDeleteModal} />
          ))
        }
      </div>
      <DialogModal open={open} setOpen={setOpen} title='College' description='Add A New Collges' className='max-w-7xl'>
        {/* <TabsIndex college={collegesData[0]}/> */}
        <CollegeForm collegeDataRefetch={collegeDataRefetch} editItem={editItem} />
      </DialogModal>
      <DialogModal open={openDeleteModal} setOpen={setOpenDeleteModal} title='Delete'>
        <p>Are you sure you want to delete this item? This action cannot be undone</p>
        <div className='w-full flex flex-row gap-2'>
          <PrimaryButton label='Cancel' />
          <PrimaryButton label='Delete' onClick={handleDelete} loading={collegeDeleteMutateIsPending} />
        </div>
      </DialogModal>
    </div>
  )
}
