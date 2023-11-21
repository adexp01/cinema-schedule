// import { Identifier, XYCoord } from 'dnd-core'
// import { update } from 'immutable'
// import React, { useCallback, useRef, useState } from 'react'
// import { useDrag, useDrop } from 'react-dnd'
// import { v4 as uuidv4 } from 'uuid'
//
// import { Title } from '@/components'
// import ShowTimeCard from '@/components/showtimeCard/ShowTimeCard'
// import { ICinemaSchedule, IMovieWithHall } from '@/types/interfaces/movie.interface'
//
// import style from './ScheduleTable.module.scss'
//
// interface IProps {
//   cinemaSchedules: ICinemaSchedule
// }
//
// export interface DragItem {
//   index: number
//   id: string
//   type: string
// }
//
// const ScheduleTable: React.FC<IProps> = ({ cinemaSchedules }) => {
//   const { CinemaSchedule } = cinemaSchedules
//   const [cards, setCards] = useState([])
//
//   const moveCard = useCallback(
//     (dragIndex: number, hoverIndex: number) => {
//       setCards((prevCards: any[]) =>
//         update(prevCards, {
//           $splice: [
//             [dragIndex, 1],
//             [hoverIndex, 0, prevCards[dragIndex]]
//           ]
//         })
//       )
//     },
//     [setCards]
//   )
//
//   const ref = useRef<HTMLDivElement>(null)
//
//   // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
//   const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
//     accept: 'Card',
//     collect (monitor) {
//       return {
//         handlerId: monitor.getHandlerId()
//       }
//     },
//     hover (item: DragItem, monitor) {
//       if (!ref.current) {
//         return
//       }
//       const dragIndex = item.index
//       const hoverIndex = index
//
//       if (dragIndex === hoverIndex) {
//         return
//       }
//
//       const hoverBoundingRect = ref.current?.getBoundingClientRect()
//
//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//
//       const clientOffset = monitor.getClientOffset()
//
//       const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
//
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return
//       }
//
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return
//       }
//
//       moveCard?.(dragIndex, hoverIndex)
//
//       item.index = hoverIndex
//     }
//   })
//
//   const [{ isDragging }, drag] = useDrag({
//     type: 'Card',
//     item: () => {
//       console.log('dragging', isDragging)
//     },
//     collect: (monitor) => ({ isDragging: monitor.isDragging() })
//   })
//
//   const renderHallList = (movieSchedule: IMovieWithHall[]) => {
//     return movieSchedule.map((hall, index) => (
//       <div className={style.tRow} key={uuidv4()} style={{ height: hall.movies.length * 39.8 }}>
//         <h3 contentEditable={true}>{hall.name}</h3>
//       </div>
//     ))
//   }
//
//   const renderMovieList = (movieSchedule: IMovieWithHall[]) => {
//     return CinemaSchedule.map((hall, index) => (
//       <div key={uuidv4()} className={style.tBody}>
//         {hall.movies.map((movie) => <p key={uuidv4()} contentEditable={true}>{movie.name}</p>)}
//       </div>
//     ))
//   }
//
//   const renderShowtimeList = (movieSchedule: IMovieWithHall[]) => {
//     return CinemaSchedule.map((hall, index) => (
//       hall.movies.map((movie) => <ShowTimeCard />)
//     ))
//   }
//
//   drag(drop(ref))
//
//   // Function to render Cleaning Schedule
//
//   return (
//     <div className={style.container}>
//       <Title>Cinema Schedule</Title>
//       <div className={style.tableContainer}>
//         <div className={style.tCol}>
//           <div className={style.tHead}>
//             <h3 className={style.thead}>Назва залів</h3>
//           </div>
//           {renderHallList(CinemaSchedule)}
//         </div>
//         <div className={style.tCol}>
//           <div className={style.tHead}>
//             <h3 className={style.thead}>Назва фільмів</h3>
//           </div>
//           {renderMovieList(CinemaSchedule)}
//         </div>
//         <div className={style.tCol}>
//           <div className={style.tHead}>
//             <h3 className={style.thead}>Назва фільмів</h3>
//           </div>
//           <div className={style.dragContainer}>
//             {renderShowtimeList(CinemaSchedule)}
//           </div>
//         </div>
//         {/* <div className={style.thead}>Showtime</div> */}
//       </div>
//     </div>
//   )
// }
//
// export { ScheduleTable }
