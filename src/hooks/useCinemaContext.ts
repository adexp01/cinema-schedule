import { useContext } from 'react'

import { CinemaContext } from '@/context'

export const useCinemaContext = () => {
  const context = useContext(CinemaContext)
  if (!context) {
    throw new Error('useCinemaContext must be used within a CinemaContextProvider')
  }
  return context
}
