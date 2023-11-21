import fetch from 'node-fetch'
import React, { useEffect } from 'react'

import { CinemaForm, Halls, Movies, ShowtimeForm } from '@/components'
import { useCinemaContext } from '@/hooks'
// import { ScheduleTable } from '@/components/ScheduleTable'
import { GoldButton } from '@/ui'
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
  const {
    hallList,
    movieList,
    cinemaInfo,
    setCinemaInfo,
    isLoaded,
    setIsLoaded,
    isReadyToSend,
    setIsReadyToSend,
    setCinemaSchedule,
    cinemaOpenTime,
    advertingTime
  } = useCinemaContext()

  const validation = hallList.length > 2 && movieList.length > 3 && cinemaOpenTime.length > 1 && advertingTime > 1

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

        const data: any = response.body

        if (!data) return

        const reader = data.getReader()
        let result: string = ''

        while (true) {
          const readerResponse = await reader?.read()

          if (readerResponse.done) break

          const chunkValue = Buffer.from(readerResponse?.value.buffer).toString()
          result += chunkValue
        }

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

  useEffect(() => {
    const openTimeValidation = cinemaOpenTime === cinemaInfo.cinemaOpenTime
    const advertingValidation = advertingTime === cinemaInfo.advertingTime

    if (openTimeValidation && advertingValidation) return

    setCinemaInfo((prev) => {
      return {
        cinemaOpenTime: openTimeValidation ? prev.cinemaOpenTime : cinemaOpenTime,
        advertingTime: advertingValidation ? prev.advertingTime : advertingTime
      }
    })
  }, [advertingTime, cinemaOpenTime])

  return (
    <div className={style.form}>
      <CinemaForm/>
      <Halls/>
      <Movies/>
      <ShowtimeForm/>
      {!isLoaded &&
        <div className={style.dotContainer}>
          <div className={style.dotElastic}></div>
        </div>
      }
      <GoldButton isDisabled={!validation} eventHandler={() => { setIsReadyToSend(true) }}>Згенерувати</GoldButton>
      {/* { cinemaSchedule?.CinemaSchedule?.length > 0 && <ScheduleTable cinemaSchedules={cinemaSchedule}/>} */}
    </div>

  )
}

export { GenerateForm }
