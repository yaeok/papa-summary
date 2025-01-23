import { useState } from 'react'

import AddTaskModal from './AddTaskModal'

const AddTaskButton = () => {
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
        登録
      </button>
      <AddTaskModal isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}

export default AddTaskButton
