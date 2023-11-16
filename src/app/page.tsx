'use client'
import 'normalize.css'
import '../styles/style.scss'

import React from 'react'

import { GenerateForm } from '@/components'

export default function Home (): React.JSX.Element {
  return (
    <div>
      <GenerateForm/>
    </div>
  )
}
