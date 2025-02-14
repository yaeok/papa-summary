import AddTaskButton from './_components/add_task/AddTaskButton'
import TaskGrid from './_components/grid/TaskGrid'
import SelectMenu from './_components/select_menu/SelectMenu'

const Page = () => {
  return (
    <div className='space-y-4'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-lg'>やることリスト</h1>
        <div className='flex flex-row gap-4'>
          <SelectMenu />
          <AddTaskButton />
        </div>
      </div>
      <TaskGrid />
    </div>
  )
}

export default Page
