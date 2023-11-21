import { ICinemaInfo, IMovie, IShowtime } from '@/types/interfaces/movie.interface'

const messageHeader: string = 'Create schedule for the cinema in json format without extra explanation, in names do not use space and other characters, only numbers and letters, json should be in the following format:\n' +
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
  '   ]' +
  '}' +
  'strictly this JSON architecture and wrap it in curly braces \'{...}\'.'
  // 'Screen1 Schedule\n' +
  // '    * Movie1:\n' +
  // '    * 09:00 - 10:00\n' +
  // '    * Movie2:\n' +
  // '    * 09:00 - 11:00\n' +
  // 'Screen2 Schedule\n' +
  // '    * Movie1:\n' +
  // '    * 09:00 - 10:00\n' +
  // 'And continues according to the conditions.\n' +
  // 'Below this schedule I need another separate cleaning schedule in the following format:\n' +
  // 'Cleaner1 Schedule\n' +
  // '    * Screen1 Cleaning\n' +
  // '    * After Movie1: 10:15 - 10:35\n' +
  // 'Cleaner2 Schedule\n' +
  // '    * Screen2 Cleaning\n' +
  // '    * After Movie1: 10:15 - 10:35\n' +
  // 'And continues.\n' +
  // '\n'
export const messageGenerator = (hallList: string[], movieList: IMovie[], showtimeList: IShowtime[], cinemaInfo: ICinemaInfo): string => {
  return messageHeader +
    'Strictly use below conditions:\n' +
    `1. Cinema opens at ${cinemaInfo.cinemaOpenTime}.\n` +
    `2 I have ${hallList.length} screens, with the following names ${hallList.join(',')}\n` +
    `3. I have ${movieList.length} movies to be shown, with the following names ${movieList.map((el) => el.name).join(', ')} , \n` +
    `${movieList.map((el) => `${el.name} duration is ${convertMinutesToHours(el.duration)}`).join(', ')}.\n"` +
    'There is condition of how may times movies should be shown:\n' +
    `${movieList.map((el) => `${el.name} should be shown ${el.showTimes.map((showtime) => `${showtime.count} times from ${showtime.from} till ${showtime.to}`).join(' and ')}`)} \n` +
    '4.There should be a maximum of 4 films in one hall.' +
    '5.Round the movie session time to the nearest multiple of 5, for example, if it\'s \'09:13-11:13\', round it to \'09:15-11:15\'.'
}

function convertMinutesToHours (minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  let result = ''

  if (hours > 0) {
    result += `${hours}hr `
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes}min`
  }

  return result.trim()
}
