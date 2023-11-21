import React, { FormEvent, useState } from 'react'

import { Title } from '@/components'
import { useCinemaContext } from '@/hooks'
import { GoldButton } from '@/ui'

import style from './Halls.module.scss'

const Halls: React.FC = () => {
  const [hallName, setHallName] = useState<string>('')

  const { cinemaOpenTime, advertingTime, hallList, setHallList } = useCinemaContext()

  const validation = cinemaOpenTime.length > 0 && advertingTime
  const opacity = validation ? 1 : 0.5

  const handleHallNaming = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHallName(e.target.value)
  }

  const handleAddHall = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (hallName.length === 0) return

    if (!hallList.includes(hallName)) {
      setHallList((prev) => [...prev, hallName])
      setHallName('')
    }
  }

  const handleRemoveHall = (index: number) => {
    setHallList((prev) => [...prev.filter((el, i) => i !== index)])
  }

  return (
    <div className={style.container} style={{ opacity, transition: '0.3s all linear', filter: `blur(${validation ? 0 : 3}px)` }}>
      <Title>2. Добавте інформацію про зали в формі нижче.</Title>
      <form className={style.form} onSubmit={handleAddHall}>
        <div className={style.formInput}>
          <div className="d">
            <h3 className={style.formTitle}>Введіть назву залу:</h3>
            <input disabled={!validation} required={true} type="text" className={style.input} value={hallName} onChange={handleHallNaming}/>
          </div>
          <GoldButton>Добавити</GoldButton>
        </div>
      </form>

      {hallList.length > 0 && <ul className={style.hallList}>
        {hallList.map((hall, index) => <li key={`${Math.random()}`} className={style.hallItem}>
          <div><span className={style.hallIndex}>{++index}.</span> {hall}</div>
          <GoldButton eventHandler={() => {
            handleRemoveHall(--index)
          }}>Видалити</GoldButton></li>)}
      </ul>}

    </div>
  )
}

export { Halls }
