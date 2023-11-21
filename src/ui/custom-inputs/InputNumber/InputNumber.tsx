import React from 'react'

import style from './InputNumber.module.scss'

interface IProps {
  isInText: boolean
  required: boolean
  isDisabled?: boolean
  max?: number
  maxLength?: number
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const InputNumber: React.FC<IProps> = ({ max, maxLength, required, value, setValue, isDisabled, isInText }) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value)
  }

  return <input
    type="text"
    inputMode="numeric"
    max={max ?? 999}
    disabled={isDisabled}
    maxLength={maxLength ?? 3}
    className={`${style.input} ${isInText ? style.inText : style.default}`}
    required={required}
    value={value}
    onChange={handleChangeValue}
  />
}

export { InputNumber }
