import React, { useState } from 'react'

import { Title } from '@/components'
import { GoldButton } from '@/ui'

import style from './Halls.module.scss'

interface IProps {
  hallList: string[]
  setHallList: React.Dispatch<React.SetStateAction<string[]>>
}

const Halls: React.FC<IProps> = ({ hallList, setHallList }) => {
  const [hallName, setHallName] = useState<string>('')

  const handleHallNaming = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHallName(e.target.value)
  }

  const handleAddHall = () => {
    if (!hallList.includes(hallName)) {
      setHallList((prev) => [...prev, hallName])
      setHallName('')
    }
  }

  const handleRemoveHall = (index: number) => {
    setHallList((prev) => [...prev.filter((el, i) => i !== index)])
  }

  return (
    <div className={style.container}>
      <Title>1. Добавте інформацію про зали в формі нижче.</Title>
      <div className={style.form}>
        <div className={style.formInput}>
          <div className="d">
            <h3 className={style.formTitle}>Введіть назву залу:</h3>
            <input type="text" className={style.input} value={hallName} onChange={handleHallNaming}/>
          </div>
          <GoldButton eventHandler={handleAddHall}>Добавити</GoldButton>
        </div>
      </div>

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
