import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

import { Task } from '@/domains/entities/task'

import DateSection from '../../../date_section/DateSection'
import Tag from '../../../tag/tag'
import CompletedButton from './button/completed_button'
import DeleteButton from './button/delete_button'
import UpdateButton from './button/update_button'

type props = {
  task: Task
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ task, isOpen, onClose }: props) {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-8 rounded-lg shadow-lg w-full md:w-1/3'>
            <button
              className='absolute -top-12 right-0 md:-right-10'
              onClick={onClose}
            >
              <IconContext.Provider value={{ size: '2.5em', color: 'white' }}>
                <RiCloseCircleFill />
              </IconContext.Provider>
            </button>
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full flex flex-row justify-between items-center'>
                <h1 className='text-2xl text-start font-semibold text-black border-b-2 border-blue-500'>
                  {task.getTitle()}
                </h1>
                <Tag timing={task.getTiming()} />
              </div>
              <div className='px-2 w-full flex flex-col justify-between items-center'>
                <div className='w-full min-h-32 flex flex-col gap-2'>
                  {task
                    .getContent()
                    .split('\n')
                    .map((content, index) => (
                      <p key={index} className='px-2 text-sm break-words'>
                        {content}
                      </p>
                    ))}
                </div>
                <div className='w-full flex justify-end'>
                  <DateSection
                    startDate={task.getStartDate()}
                    endDate={task.getEndDate()}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-between gap-4'>
              <DeleteButton />
              <UpdateButton />
              <CompletedButton />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
