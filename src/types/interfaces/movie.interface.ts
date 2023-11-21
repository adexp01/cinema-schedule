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

export interface ICinemaSchedule {
  'CinemaSchedule': IMovieWithHall[]
  'CleaningSchedule': ICleanerSchedule[]
}

export interface IMovieWithHall {
  name: string
  movies: IMovieSchedule[]
}

export interface IMovieSchedule {
  'name': string
  'showtime': string
}
export interface ICleanerSchedule {
  'employee': string
  'hallName': string
  'cleaningTime': string
}
