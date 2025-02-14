import { Label } from '@/constants/Label'
import { Status } from '@/constants/Status'
import { Task } from '@/domains/entities/task'

type props = {
  key: string
  task: Task
}

export default function TaskGridItem({ key, task }: props) {
  const handleTagColorByTiming = (timing: number) => {
    switch (timing) {
      case Status.getTaskTimingEarly():
        return 'bg-blue-500 text-white'
      case Status.getTaskTimingMiddle():
        return 'bg-yellow-500 text-white'
      case Status.getTaskTimingLate():
        return 'bg-red-500 text-white'
      case Status.getTaskTimingAfter():
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const handleTagNameByTiming = (timing: number) => {
    switch (timing) {
      case Status.getTaskTimingEarly():
        return Label.getTaskTimingEarly()
      case Status.getTaskTimingMiddle():
        return Label.getTaskTimingMiddle()
      case Status.getTaskTimingLate():
        return Label.getTaskTimingLate()
      case Status.getTaskTimingAfter():
        return Label.getTaskTimingAfter()
      default:
        return '未設定'
    }
  }
  return (
    <div
      key={key}
      onClick={() => console.log(task)}
      className='p-4 rounded-md shadow-md flex flex-col justify-between gap-4'
    >
      <div className='flex flex-row justify-between items-center gap-2'>
        <h2 className='text-lg font-semibold flex-1'>{task.getTitle()}</h2>
        {
          <span
            className={`px-4 py-2 rounded-full text-xs ${handleTagColorByTiming(
              task.getTiming()
            )}`}
          >
            {handleTagNameByTiming(task.getTiming())}
          </span>
        }
      </div>
      <p className='px-2 text-sm break-words'>{task.getContent()}</p>
      <div className='text-end text-sm'>
        {task.getStartDate().toLocaleDateString()} 〜{' '}
        {task.getEndDate()?.toLocaleDateString()}
      </div>
    </div>
  )
}
