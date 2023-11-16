import React, { useState } from 'react'

import { Title } from '@/components'
import { ICinemaInfo } from '@/types/interfaces/movie.interface'
import { GoldButton, InputNumber, InputTime } from '@/ui'

import style from './CinemaForm.module.scss'

interface IProps {
  setCinemaInfo: React.Dispatch<React.SetStateAction<ICinemaInfo>>
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const CinemaForm: React.FC<IProps> = ({ setCinemaInfo, setStatus }) => {
  const [cinemaOpenTime, setCinemaOpenTime] = useState<string>('')
  const [cleanTime, setCleanTime] = useState<number>(1)
  const [employeeCount, setEmployeeCount] = useState<number>(1)
  const [advertingTime, setAdvertingTime] = useState<number>(1)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result: ICinemaInfo = {
      cinemaOpenTime,
      cleanTime,
      employeeCount,
      advertingTime
    }

    setCinemaInfo(() => result)
    setStatus(true)
  }
  return (
    <form onSubmit={handleFormSubmit} className={style.form}>
      <Title>4. Добавте інформацію про кінотеатр.</Title>
      <label htmlFor="" className={style.formEl}>
        <h3 className={style.formElText}>Година відкриття кінотеатру:</h3>
        <InputTime required={true} value={cinemaOpenTime} setValue={setCinemaOpenTime} isInText={true}/>
      </label>
      <label htmlFor="" className={style.formEl}>
        <h3>Число працівників:</h3>
        <InputNumber
          required={true}
          value={employeeCount}
          setValue={setEmployeeCount}
          isInText={true}
        />
      </label>
      <label htmlFor="" className={style.formEl}>
        <h3>Скільки часу потрібно працівнику для прибирання одного залу:</h3>
        <InputNumber
          required={true}
          value={cleanTime}
          setValue={setCleanTime}
          isInText={true}
        />
                хв.
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
      <GoldButton>Зберегти</GoldButton>
    </form>
  )
}

export { CinemaForm }
