'use client'
import 'normalize.css'
import '../styles/style.scss'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GenerateForm } from '@/components'

export default function Home (): React.JSX.Element {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <GenerateForm/>
      </DndProvider>
    </div>
  )
}
