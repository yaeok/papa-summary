import { useState } from 'react'

import AddCategoryModal from './AddCategoryModal'

export default function AddCategoryButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      <button
        onClick={handleOpen}
        className='bg-green-500 text-white rounded-full px-4 py-1 shadow-md
        hover:bg-green-600 hover:shadow-none hover:translate-y-1 hover:duration-300 transition-all'
      >
        追加
      </button>
      <AddCategoryModal isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}
