import React from 'react'

import style from './GoldButton.module.scss'

interface IProps {
  children: React.ReactNode
  isDisabled?: boolean
  eventHandler?: () => void
}

const GoldButton: React.FC<IProps> = ({ children, eventHandler, isDisabled }) => {
  return <button disabled={isDisabled} className={style.button} onClick={eventHandler}>{children}</button>
}

export { GoldButton }
