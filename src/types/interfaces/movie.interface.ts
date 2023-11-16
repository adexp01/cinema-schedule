export interface IShowtime {
  id: string
  movieName: string
  from: string
  to: string
  count: number
}

export interface IMovie {
  name: string
  duration: number
  showTimes: IShowtime[]
  [key: string]: any
}

export interface ICinemaInfo {
  cinemaOpenTime: string
  employeeCount: number
  cleanTime: number
  advertingTime: number
  [key: string]: any
}
