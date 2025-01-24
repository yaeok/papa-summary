import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

import { Baby } from '@/domains/Baby'

import UpdateBabyForm from './UpdateBabyForm'

type UpdateBabyModalProps = {
  isOpen: boolean
  onClose: () => void
  babyInfo: Baby
  setBabyInfo: (baby: Baby) => void
}

const UpdateBabyModal = ({
  isOpen,
  onClose,
  babyInfo,
  setBabyInfo,
}: UpdateBabyModalProps) => {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full md:w-2/5'>
            <div className='w-full flex flex-row justify-between items-center'>
              <h1 className='text-xl font-semibold text-black border-b-2 border-blue-500'>
                赤ちゃん情報更新
              </h1>
              <button onClick={onClose}>
                <IconContext.Provider value={{ size: '2em', color: 'black' }}>
                  <RiCloseCircleFill />
                </IconContext.Provider>
              </button>
            </div>
            <UpdateBabyForm
              onClose={onClose}
              babyInfo={babyInfo}
              setBabyInfo={setBabyInfo}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UpdateBabyModal
