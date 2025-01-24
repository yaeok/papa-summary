import { useState } from 'react'

import { Baby } from '@/domains/Baby'

import UpdateBabyModal from './UpdateBabyModal'

type UpdateBabyButtonProps = {
  babyInfo: Baby
  setBabyInfo: (baby: Baby) => void
}

const UpdateBabyButton = ({ babyInfo, setBabyInfo }: UpdateBabyButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      <button
        onClick={handleOpen}
        className='bg-blue-500 text-white rounded-full px-4 py-1 shadow-md
        hover:bg-blue-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
      >
        情報更新
      </button>
      <UpdateBabyModal
        isOpen={isOpen}
        onClose={handleClose}
        babyInfo={babyInfo}
        setBabyInfo={setBabyInfo}
      />
    </div>
  )
}

export default UpdateBabyButton
