import React from 'react'

import style from './InputNumber.module.scss'

interface IProps {
  isInText: boolean
  required: boolean
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const InputNumber: React.FC<IProps> = ({ required, value, setValue, isInText }) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
  }

  return <input
    type="number"
    className={`${style.input} ${isInText ? style.inText : style.default}`}
    required={required}
    value={value}
    onChange={handleChangeValue}
  />
}

export { InputNumber }
