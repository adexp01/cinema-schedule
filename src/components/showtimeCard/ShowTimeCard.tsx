import { Identifier, XYCoord } from 'dnd-core'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { DragItem } from '@/components/ScheduleTable'
import style from '@/components/ScheduleTable/ScheduleTable.module.scss'

const ShowTimeCard = () => {
  // const [cards, setCards] = useState([])
  //
  // const moveCard = useCallback(
  //   (dragIndex: number, hoverIndex: number) => {
  //     setCards((prevCards: any[]) =>
  //       update(prevCards, {
  //         $splice: [
  //           [dragIndex, 1],
  //           [hoverIndex, 0, prevCards[dragIndex]]
  //         ]
  //       })
  //     )
  //   },
  //   [setCards]
  // )

  const ref = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'Card',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard?.(dragIndex, hoverIndex)

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'Card',
    item: () => {
      console.log('dragging', isDragging)
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })

  return (
    <div className={style.tBody} ref={ref} data-handler-id={handlerId}>
      <p>{movie.showtime}</p>
    </div>
  )
}

export default ShowTimeCard
