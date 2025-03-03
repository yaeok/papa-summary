import { Label } from '@/constants/Label'
import { Status } from '@/constants/Status'

type props = {
  timing: number
}

export default function Tag({ timing }: props) {
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
    <span
      className={`px-4 py-2 rounded-full text-xs ${handleTagColorByTiming(
        timing
      )}`}
    >
      {handleTagNameByTiming(timing)}
    </span>
  )
}
