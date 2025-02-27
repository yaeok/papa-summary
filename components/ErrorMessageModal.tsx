import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

type props = {
  isOpen: boolean
  onClose: () => void
  message: string
}

export default function ErrorMessageModal({ isOpen, onClose, message }: props) {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full md:w-2/5'>
            <div className='w-full flex flex-row justify-between items-center'>
              <h1 className='text-xl font-semibold text-red-500 border-b-2 border-red-500'>
                エラー
              </h1>
              <button onClick={onClose}>
                <IconContext.Provider value={{ size: '2em', color: 'black' }}>
                  <RiCloseCircleFill />
                </IconContext.Provider>
              </button>
            </div>
            <div className='p-4 text-black text-lg'>{message}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
