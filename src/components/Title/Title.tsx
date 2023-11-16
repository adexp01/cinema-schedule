import React from 'react'

import style from './Title.module.scss'

interface IProps {
  children: React.ReactNode
}

const Title: React.FC<IProps> = ({ children }) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{children}</h2>
    </div>
  )
}

export { Title }
