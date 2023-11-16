import React from 'react'

import { IInputProps } from '@/types/interfaces/inputs.interface'

import style from './InputTime.module.scss'

const InputTime: React.FC<IInputProps<string>> = ({ required, value, setValue, isInText }) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return <input type="time" className={style.input} value={value} required={required} maxLength={5} onChange={handleChangeValue}/>
}

export { InputTime }
