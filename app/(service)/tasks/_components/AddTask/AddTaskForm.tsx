import { useForm } from 'react-hook-form'

import { AddTaskUseCase } from '@/usecase/AddTaskUseCase/AddTaskUseCase'

import { useTaskContext } from '../../_hooks/TaskProvider'

type AddTaskFormType = {
  title: string
  content: string
  startDate: string
  endDate: string
}

type AddTaskFormProps = {
  onClose: () => void
}

const AddTaskForm = ({ onClose }: AddTaskFormProps) => {
  const today = new Date().toISOString().split('T')[0]
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddTaskFormType>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      startDate: today,
      endDate: today,
    },
  })
  const taskContext = useTaskContext()

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const onSubmit = handleSubmit(async (data: AddTaskFormType) => {
    const { title, content, startDate, endDate } = data

    const service = new AddTaskUseCase()

    const result = await service.execute({
      title,
      content,
      startDate: new Date(startDate),
      endDate: endDate === '' ? null : new Date(endDate),
    })

    taskContext.addTask(result.result)

    onClose()
  })

  return (
    <div>
      <form onSubmit={onSubmit} className='w-full space-y-4'>
        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='title'>
              タイトル<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...register('title', {
                required: 'タイトルは必須です',
              })}
              className='border-2 border-gray-300 rounded-md p-2'
            />
            {errors.title && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.title.message}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>内容</label>
            <textarea
              {...register('content')}
              className='border-2 border-gray-300 rounded-md p-2 h-40 max-h-48'
            />
          </div>
          <div className='w-full flex flex-row gap-4'>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor='startDate'>
                開始日<span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                {...register('startDate', {
                  required: '開始日は必須です',
                  validate: (value) => {
                    console.log('startDate', value)
                    console.log('endDate', endDate)
                    if (endDate === '') return true
                    return (
                      new Date(value) <= new Date(endDate) ||
                      '終了日より前に設定してください'
                    )
                  },
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.startDate && (
                <span className='pl-2 text-xs text-red-500'>
                  {errors.startDate.message}
                </span>
              )}
            </div>
            <div className='w-full flex flex-col gap-2'>
              <label htmlFor='endDate'>終了日</label>
              <input
                type='date'
                {...register('endDate', {
                  validate: (value) => {
                    if (value === '') return true
                    return (
                      new Date(value) >= new Date(startDate) ||
                      '開始日より後に設定してください'
                    )
                  },
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.endDate && (
                <span className='pl-2 text-xs text-red-500'>
                  {errors.endDate.message}
                </span>
              )}
            </div>
          </div>
        </section>
        <section className='flex justify-center'>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md
              hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
          >
            登録
          </button>
        </section>
      </form>
    </div>
  )
}

export default AddTaskForm
