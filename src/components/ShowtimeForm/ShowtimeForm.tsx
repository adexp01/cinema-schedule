import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Title } from '@/components'
import { IMovie, IShowtime } from '@/types/interfaces/movie.interface'
import { GoldButton, InputTime } from '@/ui'

import style from './ShowtimeForm.module.scss'

interface IProps {
  movieList: IMovie[]
  setMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
}

const ShowtimeForm: React.FC<IProps> = ({ movieList, setMovieList }) => {
  const [showtimeCount, setShowtimeCount] = useState<number>(0)
  const [showtimeFrom, setShowtimeFrom] = useState<string>('')
  const [showtimeTo, setShowtimeTo] = useState<string>('')
  const [showtimeList, setShowtimeList] = useState<IShowtime[]>([])
  const [movieIndex, setMovieIndex] = useState<number>(0)
  const handleShowtimeCreate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (showtimeCount === 0 || showtimeFrom?.length === 0 || showtimeTo?.length === 0) return

    const currentMovie: IMovie | undefined = movieList.find((el, i) => i === movieIndex)

    if (!currentMovie) return

    currentMovie?.showTimes.push({ id: uuidv4(), movieName: currentMovie.name, count: showtimeCount, from: showtimeFrom, to: showtimeTo })

    setMovieList((prev) => [...prev.filter((el, i) => i !== movieIndex), currentMovie])
    setShowtimeList(movieList.map(movie => movie.showTimes).flat())
  }

  const handleShowtimeRemove = (id: string): void => {
    const currentMovie: IMovie | undefined = movieList.find((el, i) => i === movieIndex)

    if (!currentMovie) return

    currentMovie.showTimes = currentMovie?.showTimes.filter((showtime) => showtime.id !== id)

    setMovieList((prev) => [...prev.filter((el, i) => i !== movieIndex), currentMovie])
    setShowtimeList(movieList.map(movie => movie.showTimes).flat())
  }

  return (
    <div className={style.container}>
      <div>
        <Title>3. Добавте інформацію про фільми.</Title>

        <form
          id="showtime"
          className={style.showtimeAddForm}
          onSubmit={handleShowtimeCreate}
        >
          <div className={style.showtimeAddFormEl}>
            <span>Фільм</span>
            <select className={style.movieSelect} name="movieSelect" onChange={(e) => { setMovieIndex(+e.target.value) }}>
              {movieList.map((movie, index) => <option value={index}>{movie.name}</option>)}
            </select>
            <span>потрібно показати</span>
            <input
              type="number"
              name="count"
              value={showtimeCount}
              required={true}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setShowtimeCount(+e.target.value) }}
            />
            <span>
              {showtimeCount > 1 ? 'рази' : 'раз'}
            </span>
          </div>
          <div className={style.showtimeAddFormEl}>
            <span>В проміжку</span>
            <InputTime
              required={true}
              value={showtimeFrom}
              setValue={setShowtimeFrom}
              isInText={true}
            />
            <span>-</span>
            <InputTime
              isInText={true}
              required={true}
              value={showtimeTo}
              setValue={setShowtimeTo }
            />

          </div>
          <GoldButton>Добавити сеанс</GoldButton>
        </form>
      </div>
      {showtimeList.length > 0 &&
        <ul className={style.showtimeList}>
          {showtimeList.map((showtime, index) => (
            <li key={showtime.id} className={style.showtimeListEl}>
              <span>{++index}. `{showtime.movieName}` показати {showtime.count} {showtime.count > 1 ? 'рази' : 'раз'} в проміжку {showtime.from} - {showtime.to}</span>
              <GoldButton eventHandler={() => { handleShowtimeRemove(showtime.id) }}>Видалити</GoldButton>
            </li>
          ))}
        </ul>
      }
    </div>

  )
}

export { ShowtimeForm }
