import { useForm } from 'react-hook-form'

type TaskCreateFormType = {
  title: string
  content: string
  startDate: string
  endDate: string
}

const TaskCreateForm = () => {
  const today = new Date().toISOString().split('T')[0]
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskCreateFormType>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      startDate: today,
      endDate: today,
    },
  })

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const onSubmit = handleSubmit((data) => {
    console.log(data)
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
            <label htmlFor='content'>
              内容<span className='text-red-500'>*</span>
            </label>
            <textarea
              {...register('content')}
              className='border-2 border-gray-300 rounded-md p-2 max-h-40'
            />
            {errors.content && (
              <span className='pl-2 text-xs text-red-500'>
                {errors.content.message}
              </span>
            )}
          </div>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='startDate'>
                開始日<span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                {...register('startDate', {
                  required: '開始日は必須です',
                  validate: (value) =>
                    new Date(value) < new Date(endDate) ||
                    '終了日より前に設定してください',
                })}
                className='border-2 border-gray-300 rounded-md p-2'
              />
              {errors.startDate && (
                <span className='pl-2 text-xs text-red-500'>
                  {errors.startDate.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='endDate'>
                終了日<span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                {...register('endDate', {
                  required: '終了日は必須です',
                  validate: (value) =>
                    new Date(value) > new Date(startDate) ||
                    '開始日より後に設定してください',
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

export default TaskCreateForm
