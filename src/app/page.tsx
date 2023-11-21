'use client'
import 'normalize.css'
import '../styles/style.scss'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GenerateForm } from '@/components'
import { CinemaContextProvider } from '@/context/CinemaContextProvider'

export default function Home (): React.JSX.Element {
  return (
    <CinemaContextProvider>
      <DndProvider backend={HTML5Backend}>
        <GenerateForm/>
      </DndProvider>
    </CinemaContextProvider>
  )
}
