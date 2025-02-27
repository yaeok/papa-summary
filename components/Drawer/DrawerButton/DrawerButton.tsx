'use client'

import { RxHamburgerMenu } from 'react-icons/rx'

type props = {
  toggleDrawer: () => void
}

export default function DrawerButton({ toggleDrawer }: props) {
  return (
    <button className='block lg:hidden' onClick={toggleDrawer}>
      <RxHamburgerMenu />
    </button>
  )
}
