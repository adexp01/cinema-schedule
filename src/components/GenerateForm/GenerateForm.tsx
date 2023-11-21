import fetch from 'node-fetch'
import React, { useEffect, useState } from 'react'

import { CinemaForm, Halls, Movies, ShowtimeForm } from '@/components'
import { ScheduleTable } from '@/components/ScheduleTable'
import { ICinemaInfo, ICinemaSchedule, IMovie } from '@/types/interfaces/movie.interface'
import { messageGenerator } from '@/utils/message-generator.util'

import style from './GenerateForm.module.scss'

const dataForTest: string = 'Create schedule for the cinema in json format without extra explanation, in names do not use space and other characters, only numbers and letters, json should be in the following format:\n' +
  '\n' +
  '{\n' +
  '   "CinemaSchedule":[\n' +
  '      {\n' +
  '         "name":"hall1",\n' +
  '         "movies":[\n' +
  '            {\n' +
  '               "name":"movie1",\n' +
  '               "showtime":"09:00-10:50"\n' +
  '            },\n' +
  '            {\n' +
  '               "name":"movie2",\n' +
  '               "showtime":"11:11-13:14"\n' +
  '            }\n' +
  '         ]\n' +
  '      },\n' +
  '      {\n' +
  '         "name":"hall2",\n' +
  '         "movies":[\n' +
  '            {\n' +
  '               "name":"movie1",\n' +
  '               "showtime":"09:00-10:50"\n' +
  '            },\n' +
  '            {\n' +
  '               "name":"movie2",\n' +
  '               "showtime":"11:11-13:14"\n' +
  '            }\n' +
  '         ]\n' +
  '      },\n' +
  '      {\n' +
  '         "name":"hall3",\n' +
  '         "movies":[\n' +
  '            {\n' +
  '               "name":"movie1",\n' +
  '               "showtime":"09:00-10:50"\n' +
  '            },\n' +
  '            {\n' +
  '               "name":"movie2",\n' +
  '               "showtime":"11:11-13:14"\n' +
  '            }\n' +
  '         ]\n' +
  '      }\n' +
  '   ]}strictly this JSON architecture and wrap it in curly braces \'{...}\'.Strictly use below conditions:\n' +
  '1. Cinema opens at 09:00.\n' +
  '2 I have 3 screens, with the following names Агатовий,Рубіновий,Графітовий\n' +
  '3. I have 3 movies to be shown, with the following names Довбуш, Дедпул, Барбі , \n' +
  'Довбуш duration is 2hr 4min, Дедпул duration is 2hr 4min, Барбі duration is 2hr 4min.\n' +
  '"There is condition of how may times movies should be shown:\n' +
  'Довбуш should be shown 3 times from 09:00 till 18:00,Дедпул should be shown 3 times from 09:00 till 18:00,Барбі should be shown 3 times from 09:00 till 18:00 \n' +
  '6.Before each movie , we need to show 20 minutes of advertisement, this should be added to the movie duration. And return only json'

const GenerateForm: React.FC = () => {
  const [hallList, setHallList] = useState<string[]>([])
  const [movieList, setMovieList] = useState<IMovie[]>([])
  const [cinemaInfo, setCinemaInfo] = useState<ICinemaInfo>({
    advertingTime: 0,
    cleanTime: 0,
    cinemaOpenTime: '',
    employeeCount: 0
  })
  const [isLoaded, setIsLoaded] = useState<boolean>(true)
  const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false)
  const [cinemaSchedule, setCinemaSchedule] = useState<ICinemaSchedule>({
    CinemaSchedule: [],
    CleaningSchedule: []
  })
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

    try {
      if (status) {
        setIsLoaded(false)
        const showtimeList = movieList.map(movie => movie.showTimes).flat()

        const message = messageGenerator(hallList, movieList, showtimeList, cinemaInfo)

        const response = await fetch('/api/chat', {
          method: 'POST',
          body: JSON.stringify({
            message: dataForTest
          })
        })

        let result: string = ''

        const data: any = response.body

        if (!data) return

        const reader = data.getReader()

        while (true) {
          const readerResponse = await reader?.read()

          if (readerResponse.done) break

          const chunkValue = Buffer.from(readerResponse?.value.buffer).toString()
          result += chunkValue
        }

        console.log(result)
        setCinemaSchedule(() => JSON.parse(result))
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoaded(true)
      setIsReadyToSend(false)
    }
  }

  useEffect(() => {
    void func().then()
  }, [isReadyToSend])

  return (
    <div className={style.form}>
      <Halls hallList={hallList} setHallList={setHallList}/>
      <Movies movieList={movieList} setMovieList={setMovieList}/>
      <ShowtimeForm movieList={movieList} setMovieList={setMovieList}/>
      <CinemaForm setCinemaInfo={setCinemaInfo} setStatus={setIsReadyToSend}/>
      {!isLoaded && <div className={style.dotContainer}><div className={style.dotElastic}></div></div>}

      { cinemaSchedule?.CinemaSchedule?.length > 0 && <ScheduleTable cinemaSchedules={cinemaSchedule}/>}
    </div>

  )
}

export { GenerateForm }
