'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Baby } from '@/domains/entities/baby'
import { InitialDisplayProfilePageUseCase } from '@/usecase/initial_display_profile_page_usecase'

type ProfilePageContextType = {
  loading: boolean
  baby: Baby | null
  setBaby: React.Dispatch<React.SetStateAction<Baby | null>>
}

const ProfilePageContext = createContext<ProfilePageContextType>({
  loading: false,
  baby: null,
  setBaby: () => {},
})

export const useProfilePageContext = () => useContext(ProfilePageContext)

export const ProfilePageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [loading, setLoading] = useState(false)
  const [baby, setBaby] = useState<Baby | null>(null)

  useEffect(() => {
    const fetchBaby = async () => {
      const usecase = new InitialDisplayProfilePageUseCase()
      const { response } = await usecase.execute()
      setBaby(response.baby)
    }

    const fetch = async () => {
      setLoading(true)
      await Promise.all([fetchBaby()])
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <ProfilePageContext.Provider
      value={{
        loading,
        baby,
        setBaby,
      }}
    >
      {children}
    </ProfilePageContext.Provider>
  )
}
