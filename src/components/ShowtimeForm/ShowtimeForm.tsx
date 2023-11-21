import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Title } from '@/components'
import { useCinemaContext } from '@/hooks'
import { IMovie, IShowtime } from '@/types/interfaces/movie.interface'
import { GoldButton, InputNumber, InputTime } from '@/ui'

import style from './ShowtimeForm.module.scss'

const ShowtimeForm: React.FC = () => {
  const [showtimeCount, setShowtimeCount] = useState<number>(0)
  const [showtimeFrom, setShowtimeFrom] = useState<string>('')
  const [showtimeTo, setShowtimeTo] = useState<string>('')
  const [showtimeList, setShowtimeList] = useState<IShowtime[]>([])
  const [movieIndex, setMovieIndex] = useState<number>(0)

  const { movieList, setMovieList } = useCinemaContext()

  const validation = movieList.length > 3
  const opacity = validation ? 1 : 0.5

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
    <div className={style.container} style={{ opacity, transition: '0.3s all linear', filter: `blur(${validation ? 0 : 3}px)` }}>
      <div>
        <Title>4. Добавте інформацію про фільми.</Title>

        <form
          id="showtime"
          className={style.showtimeAddForm}
          onSubmit={handleShowtimeCreate}
        >
          <div className={style.showtimeAddFormEl}>
            <span>Фільм</span>
            <select className={style.movieSelect} name="movieSelect" onChange={(e) => { setMovieIndex(+e.target.value) }}>
              {movieList.map((movie, index) => <option key={index} value={index}>{movie.name}</option>)}
            </select>
            <span>потрібно показати</span>
            <InputNumber
              value={showtimeCount}
              required={true}
              isInText={true}
              max={9}
              maxLength={2}
              setValue={setShowtimeCount}
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
