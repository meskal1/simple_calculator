import { FC, DragEvent, ReactNode, MouseEvent } from 'react'

import {
  setIsDraging,
  setDragElementId,
  setDragOverElementId,
  setIsConstructorArea,
  setConstructorElements,
} from '../../../app/appSlice'
import style from '../../../features/CalcConstructor/CalcConstructor.module.scss'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'

import s from './DragDrop.module.scss'

type DragDropType = {
  id: string
  disable?: boolean
  children?: ReactNode
  hideElement: boolean
  forConstructor: boolean
}

export const DragDrop: FC<DragDropType> = ({
  id,
  children,
  disable = false,
  hideElement = false,
  forConstructor,
}) => {
  const dispatch = useAppDispatch()
  const elementsIDs = useAppSelector(store => store.app.elementsIDs)
  const dragElementId = useAppSelector(store => store.app.dragElementId)
  const dragOverElementId = useAppSelector(store => store.app.dragOverElementId)
  const isConstructorArea = useAppSelector(store => store.app.isConstructorArea)
  const isDraging = useAppSelector(store => store.app.isDraging)
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)
  const separatorIfCondition = forConstructor && isConstructorArea && isDraging

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (forConstructor && id === '1') {
      e.preventDefault()
    }
    dispatch(setIsDraging(true))
    dispatch(setDragElementId(e.currentTarget.id))
  }

  const handleDragLeave = () => dispatch(setDragOverElementId(''))

  const handleDragEnd = () => dispatch(setIsConstructorArea(false))

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (forConstructor && dragOverElementId !== e.currentTarget.id) {
      dispatch(setDragOverElementId(e.currentTarget.id))
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dispatch(setIsDraging(false))
    dispatch(setDragOverElementId(''))

    if (forConstructor) {
      if (dragElementId === e.currentTarget.id) return
      const arrayIDs = elementsIDs.filter(id => id !== dragElementId)

      arrayIDs.splice(arrayIDs.indexOf(dragOverElementId), 0, dragElementId)
      dispatch(setConstructorElements(arrayIDs))
    }
  }

  const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isInRuntime && forConstructor) {
      const arrayIDs = elementsIDs.filter(id => id !== e.currentTarget.id)

      dispatch(setConstructorElements(arrayIDs))
    }
  }

  if (hideElement) return null

  return (
    <div
      id={id}
      className={`${s.elementContainer} ${disable ? s.disable : ''} ${style.noShadow} ${
        !isInRuntime && s.constructorArea
      } ${!isInRuntime && id === '1' && forConstructor && s.displayCursor}`}
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={!isInRuntime}
      onDoubleClick={handleDoubleClick}
    >
      {separatorIfCondition &&
        dragOverElementId === id &&
        dragOverElementId !== '1' &&
        dragOverElementId !== dragElementId && <div className={s.topSeparator} />}
      {children}
      {separatorIfCondition &&
        id === elementsIDs.at(-1) &&
        dragElementId !== elementsIDs.at(-1) &&
        dragOverElementId === '' && <div className={s.bottomSeparator} />}
    </div>
  )
}
