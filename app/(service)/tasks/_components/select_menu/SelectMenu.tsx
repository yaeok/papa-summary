'use client'

import { Label } from '@/constants/Label'
import { Status } from '@/constants/Status'

import { useTaskContext } from '../../_hooks/TaskProvider'

export default function SelectMenu() {
  const taskContext = useTaskContext()

  return (
    <select
      name='task-select'
      id='task-select'
      onChange={(e) => taskContext.setTiming(Number(e.target.value))}
      className='focus:outline-none bg-white'
    >
      <option value={Status.getTaskTimingAll()}>全て</option>
      <option value={Status.getTaskTimingEarly()}>
        {Label.getTaskTimingEarly()}
      </option>
      <option value={Status.getTaskTimingMiddle()}>
        {Label.getTaskTimingMiddle()}
      </option>
      <option value={Status.getTaskTimingLate()}>
        {Label.getTaskTimingLate()}
      </option>
      <option value={Status.getTaskTimingAfter()}>
        {Label.getTaskTimingAfter()}
      </option>
    </select>
  )
}
