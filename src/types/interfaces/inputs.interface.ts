import React from 'react'

export interface IInputProps<T> {
  isInText: boolean
  required: boolean
  value: T
  setValue: React.Dispatch<React.SetStateAction<T>>
}
