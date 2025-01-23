'use client'

import { RxHamburgerMenu } from 'react-icons/rx'

type DrawerButtonProps = {
  toggleDrawer: () => void
}

export default function DrawerButton({ toggleDrawer }: DrawerButtonProps) {
  return (
    <button className='block lg:hidden' onClick={toggleDrawer}>
      <RxHamburgerMenu />
    </button>
  )
}
