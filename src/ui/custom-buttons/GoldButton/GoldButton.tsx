import React from 'react'

import style from './GoldButton.module.scss'

interface IProps {
  children: React.ReactNode
  eventHandler?: () => void
}

const GoldButton: React.FC<IProps> = ({ children, eventHandler }) => {
  return <button className={style.button} onClick={eventHandler}>{children}</button>
}

export { GoldButton }
