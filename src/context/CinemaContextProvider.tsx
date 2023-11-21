import React, { createContext, FC, ReactNode, useState } from 'react'

import { ICinemaInfo, ICinemaSchedule, IMovie } from '@/types/interfaces/movie.interface'

interface CinemaContextType {
  hallList: string[]
  setHallList: React.Dispatch<React.SetStateAction<string[]>>
  movieList: IMovie[]
  setMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
  cinemaInfo: ICinemaInfo
  setCinemaInfo: React.Dispatch<React.SetStateAction<ICinemaInfo>>
  isLoaded: boolean
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  isReadyToSend: boolean
  setIsReadyToSend: React.Dispatch<React.SetStateAction<boolean>>
  cinemaSchedule: ICinemaSchedule
  setCinemaSchedule: React.Dispatch<React.SetStateAction<ICinemaSchedule>>
  cinemaOpenTime: string
  setCinemaOpenTime: React.Dispatch<React.SetStateAction<string>>
  advertingTime: number
  setAdvertingTime: React.Dispatch<React.SetStateAction<number>>
}

export const CinemaContext = createContext<CinemaContextType | undefined>(undefined)

interface IProps {
  children: ReactNode
}

const CinemaContextProvider: FC<IProps> = ({ children }) => {
  const [hallList, setHallList] = useState<string[]>([])
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const [cinemaInfo, setCinemaInfo] = useState<ICinemaInfo>({
    advertingTime: 0,
    cinemaOpenTime: ''
  })
  const [isLoaded, setIsLoaded] = useState<boolean>(true)
  const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false)
  const [cinemaSchedule, setCinemaSchedule] = useState<ICinemaSchedule>({
    CinemaSchedule: []
  })
  const [cinemaOpenTime, setCinemaOpenTime] = useState<string>('')
  const [advertingTime, setAdvertingTime] = useState<number>(1)

  const value = {
    hallList,
    setHallList,
    movieList,
    setMovieList,
    cinemaInfo,
    setCinemaInfo,
    isLoaded,
    setIsLoaded,
    isReadyToSend,
    setIsReadyToSend,
    cinemaSchedule,
    setCinemaSchedule,
    cinemaOpenTime,
    setCinemaOpenTime,
    advertingTime,
    setAdvertingTime
  }

  return (
    <CinemaContext.Provider value={value}>
      {children}
    </CinemaContext.Provider>
  )
}

export { CinemaContextProvider }
