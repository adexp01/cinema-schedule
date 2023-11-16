import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CinemaForm, Halls, Movies, ShowtimeForm } from '@/components'
import { ICinemaInfo, IMovie } from '@/types/interfaces/movie.interface'
import { IOpenAiResponse } from '@/types/interfaces/openai.interface'
import { messageGenerator } from '@/utils/message-generator.util'

import style from './GenerateForm.module.scss'

const GenerateForm: React.FC = () => {
  const [hallList, setHallList] = useState<string[]>([])
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const [cinemaInfo, setCinemaInfo] = useState<ICinemaInfo>({
    advertingTime: 0,
    cleanTime: 0,
    cinemaOpenTime: '',
    employeeCount: 0
  })
  const [openAiResp, setOpenAiResp] = useState<IOpenAiResponse>()

  const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false)
  useEffect(() => {
    if (!isReadyToSend) return

    let status: boolean = true

    for (const cinemaInfoKey in cinemaInfo) {
      const currentValue: any = cinemaInfo[cinemaInfoKey]

      if (typeof currentValue === 'number') {
        status = currentValue !== 0
      }

      if (typeof currentValue === 'string') { status = currentValue.length > 0 }
    }

    if (status) {
      void axios.post('/api/gpt-chat', {
        message: messageGenerator(
          hallList,
          movieList,
          [...movieList.map(movie => movie.showTimes).flat()],
          cinemaInfo
        )
      }).then(res => { setOpenAiResp(res.data) })
    }
    setIsReadyToSend(false)
  }, [isReadyToSend])

  return (
    <div className={style.form}>
      <Halls hallList={hallList} setHallList={setHallList}/>
      <Movies movieList={movieList} setMovieList={setMovieList}/>
      <ShowtimeForm movieList={movieList} setMovieList={setMovieList}/>
      <CinemaForm setCinemaInfo={setCinemaInfo} setStatus={setIsReadyToSend}/>
      {openAiResp && <p className={style.resp}>{openAiResp.message.choices[0].message.content}</p>}

      {/* <GoldButton>Згенерувати розклад</GoldButton> */}
    </div>

  )
}

export { GenerateForm }
