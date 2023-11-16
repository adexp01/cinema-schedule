import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CinemaForm, Halls, Movies, ShowtimeForm } from '@/components'
import { ICinemaInfo, IMovie } from '@/types/interfaces/movie.interface'
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
  const [openAiResp, setOpenAiResp] = useState<any>()

  const func = async () => {
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
      const { data } = await axios.post('/api/gpt-chat', {
        message: messageGenerator(
          hallList,
          movieList,
          [...movieList.map(movie => movie.showTimes).flat()],
          cinemaInfo
        )
      }, { timeout: 60 * 1000 })

      console.log(data.choices[0].message.content)
      setOpenAiResp(data.choices[0].message.content)
      // const socket = await data
      //
      // console.log(socket)
      //
      // console.log(await data)
      //
      // for await (const chunk of data) {
      //   console.log(chunk)
      // }
    }
    setIsReadyToSend(false)
  }

  const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false)
  useEffect(() => {
    void func().then()
  }, [isReadyToSend])

  return (
    <div className={style.form}>
      <Halls hallList={hallList} setHallList={setHallList}/>
      <Movies movieList={movieList} setMovieList={setMovieList}/>
      <ShowtimeForm movieList={movieList} setMovieList={setMovieList}/>
      <CinemaForm setCinemaInfo={setCinemaInfo} setStatus={setIsReadyToSend}/>
      {openAiResp && <p className={style.resp}>{openAiResp}</p>}

      {/* <GoldButton>Згенерувати розклад</GoldButton> */}
    </div>

  )
}

export { GenerateForm }
