import { FC, DragEvent } from 'react'

import {
  setConstructorElements,
  setDragElementId,
  setIsConstructorArea,
  setIsDraging,
} from '../../app/appSlice'
import itemsAreaIcon from '../../assets/icons/itemsAreaIcon.svg'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Sidebar } from '../SidebarContainer/Sidebar/Sidebar'

import s from './CalcConstructor.module.scss'

type CalcConstructorType = {}

export const CalcConstructor: FC<CalcConstructorType> = ({}) => {
  const dispatch = useAppDispatch()
  const { elementsIDs, dragElementId, dragOverElementId, isConstructorArea } = useAppSelector(
    store => store.app
  )
  const wrapperStyle = elementsIDs.length ? s.constuctorContainer : s.previewDropDownArea

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.removeAttribute('style')
    dispatch(setIsConstructorArea(false))
  }

  const handleDragEnd = () => dispatch(setIsConstructorArea(false))

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!isConstructorArea) {
      dispatch(setIsConstructorArea(true))
    }

    if (!elementsIDs.length) {
      e.currentTarget.style.background = '#F0F9FF'
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.removeAttribute('style')

    if (dragElementId && !elementsIDs.includes(dragElementId)) {
      const arrayIDs = elementsIDs.filter(id => id !== dragElementId)

      arrayIDs.splice(arrayIDs.indexOf(dragOverElementId), 0, dragElementId)
      dispatch(setConstructorElements(arrayIDs))
    }

    if (dragElementId && dragOverElementId === '') {
      const arrayIDs = elementsIDs.filter(id => id !== dragElementId)

      arrayIDs.push(dragElementId)
      dispatch(setConstructorElements(arrayIDs))
    }

    dispatch(setIsConstructorArea(false))
    dispatch(setIsDraging(false))
    dispatch(setDragElementId(''))
  }

  return (
    <div
      className={wrapperStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {elementsIDs.length ? (
        <Sidebar elementsIdArray={elementsIDs} forConstructor={true} />
      ) : (
        <>
          <img src={itemsAreaIcon} alt="itemsAreaIcon" />
          <div className={s.textContainer}>
            <span className={s.boldText}>Перетащите сюда</span>
            <span className={s.text}>любой элемент из левой панели</span>
          </div>
        </>
      )}
    </div>
  )
}
