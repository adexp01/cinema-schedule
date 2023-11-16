import React, { useState } from 'react'

import { Title } from '@/components'
import { IMovie } from '@/types/interfaces/movie.interface'
import { GoldButton } from '@/ui'

import style from './Movies.module.scss'

interface IProps {
  movieList: IMovie[]
  setMovieList: React.Dispatch<React.SetStateAction<IMovie[]>>
}

const Movies: React.FC<IProps> = ({ movieList, setMovieList }) => {
  const [movie, setMovie] = useState<IMovie>({
    name: '',
    duration: 0,
    showTimes: []
  })
  const [movieName, setMovieName] = useState<string>('')
  const [movieDuration, setMovieDuration] = useState<number>(0)

  const handleUpdateMovieName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMovieName(e.target.value)
  }

  const handleUpdateMovieDuration = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length <= 3) {
      setMovieDuration(+e.target.value)
    }
  }

  const handleAddMovie = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (!movieList.some((movie) => movie.name === movieName)) {
      setMovieList((prev) => [
        ...prev,
        { ...movie, duration: movieDuration, name: movieName }
      ])

      setMovie({
        index: 0,
        name: '',
        duration: 0,
        showTimes: []
      })
    }
  }

  const handleRemoveMovie = (index: number) => {
    setMovieList((prev) => prev.filter((movie, i) => i !== index))
  }

  const handleAddMovieShowtime = (index: number) => {
    setMovieList((prev) => prev.filter((movie, i) => i !== index))
  }

  return (
    <div className={style.container}>
      <Title>2. Добавте фільми які потрібно вписати в розклад.</Title>
      <form className={style.formInput} onSubmit={handleAddMovie}>
        <div className={style.form}>
          <div className={style.formElement}>
            <h3 className={style.formTitle}>Назва фільму:</h3>
            <input
              type="text"
              name="name"
              autoComplete="off"
              className={style.input}
              value={movieName}
              onChange={handleUpdateMovieName}
            />
          </div>
          <div className={style.formElement}>
            <h3 className={style.formTitle}>Тривалість (хв.):</h3>
            <input
              type="number"
              name="duration"
              max={999}
              maxLength={3}
              className={style.input}
              value={movieDuration}
              onChange={handleUpdateMovieDuration}
            />
          </div>

          <button
            className={style.button}
          >
                       Добавити
          </button>
        </div>

      </form>

      {movieList.length > 0 && <ul className={style.movieList}>
        {movieList.map((movie, index) =>
          <li key={`${Math.random() + index}`} className={style.movieItem}>
            <div className={style.movieItemContainer}>
              <div>
                <span className={style.movieItemContent}>{++index}. {movie.name} | {movie.duration}хв.</span>
              </div>
              <GoldButton eventHandler={() => {
                handleRemoveMovie(--index)
              }}>Видалити</GoldButton>
            </div>

          </li>)}
      </ul>}
    </div>
  )
}

export {
  Movies
}
