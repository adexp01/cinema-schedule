import React from 'react'

import { Title } from '@/components'
import { useCinemaContext } from '@/hooks'
import { InputNumber, InputTime } from '@/ui'

import style from './CinemaForm.module.scss'

const CinemaForm: React.FC = () => {
  const {
    setCinemaOpenTime,
    cinemaOpenTime,
    setAdvertingTime,
    advertingTime
  } = useCinemaContext()

  return (
    <div className={style.form}>
      <Title>1. Добавте інформацію про кінотеатр.</Title>
      <label htmlFor="" className={style.formEl}>
        <h3 className={style.formElText}>Година відкриття кінотеатру:</h3>
        <InputTime required={true} value={cinemaOpenTime} setValue={setCinemaOpenTime} isInText={true}/>
      </label>
      <label htmlFor="" className={style.formEl}>
        <h3>Скільки часу триває реклама:</h3>
        <InputNumber
          required={true}
          value={advertingTime}
          setValue={setAdvertingTime}
          isInText={true}
        />
                хв.
      </label>
    </div>
  )
}

export { CinemaForm }
