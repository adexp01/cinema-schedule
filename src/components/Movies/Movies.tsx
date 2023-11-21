import React, { useState } from 'react'

import { Title } from '@/components'
import { useCinemaContext } from '@/hooks'
import { IMovie } from '@/types/interfaces/movie.interface'
import { GoldButton, InputNumber } from '@/ui'

import style from './Movies.module.scss'

const Movies: React.FC = () => {
  const [movie, setMovie] = useState<IMovie>({
    name: '',
    duration: 0,
    showTimes: []
  })
  const [movieName, setMovieName] = useState<string>('')
  const [movieDuration, setMovieDuration] = useState<number>(1)

  const { advertingTime, hallList, movieList, setMovieList } = useCinemaContext()

  const validation = hallList.length > 2
  const opacity = validation ? 1 : 0.5

  const handleUpdateMovieName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMovieName(e.target.value)
  }

  const handleAddMovie = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (movieName.length === 0) return

    if (!movieList.some((movie) => movie.name === movieName)) {
      setMovieList((prev) => [
        ...prev,
        { ...movie, duration: movieDuration + advertingTime, name: movieName }
      ])

      setMovie({
        index: 0,
        name: '',
        duration: 0,
        showTimes: []
      })
      setMovieName('')
    }
  }

  const handleRemoveMovie = (index: number) => {
    setMovieList((prev) => prev.filter((movie, i) => i !== index))
  }

  return (
    <div className={style.container} style={{ opacity, transition: '0.3s all linear', filter: `blur(${validation ? 0 : 3}px)` }}>
      <Title>3. Добавте фільми які потрібно вписати в розклад.</Title>
      <form className={style.formInput} onSubmit={handleAddMovie}>
        <div className={style.form}>
          <div className={style.formElement}>
            <h3 className={style.formTitle}>Назва фільму:</h3>
            <input
              type="text"
              name="name"
              required={true}
              autoComplete="off"
              className={style.input}
              value={movieName}
              disabled={!validation}
              onChange={handleUpdateMovieName}
            />
          </div>
          <div className={style.formElement}>
            <h3 className={style.formTitle}>Тривалість:</h3>
            <div className={style.inputWrapper}>
              <InputNumber
                required={true}
                isInText={false}
                value={movieDuration}
                setValue={setMovieDuration}
              />
              <span>хв.</span>
            </div>
          </div>
          <button className={style.button} disabled={!validation}>Добавити</button>
        </div>
      </form>
      {movieList.length > 0 && <ul className={style.movieList}>
        {movieList.map((movie, index) =>
          <li key={`${Math.random() + index}`} className={style.movieItem}>
            <div className={style.movieItemContainer}>
              <div>
                <span className={style.movieItemContent}>{++index}. {movie.name} | {movie.duration}хв.</span>
              </div>
              <GoldButton eventHandler={() => { handleRemoveMovie(--index) }}>Видалити</GoldButton>
            </div>
          </li>)}
      </ul>}
    </div>
  )
}

export {
  Movies
}
