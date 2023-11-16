'use client'
import 'normalize.css'
import '../styles/style.scss'

import axios from 'axios'
import React from 'react'

import { GenerateForm } from '@/components'

export default function Home (): React.JSX.Element {
  const callChat = async () => {
    await axios.post('/api/gpt-chat', { message: 'Hello, how are you ?' }).then(res => { console.log(res.data.message) })
  }

  return (
    <div>
      <GenerateForm/>
    </div>
  )
}
