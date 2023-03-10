import { FC, MouseEvent } from 'react'

import { OperationType, setOperation } from '../../../../app/appSlice'
import { DragDrop } from '../../../../components/DragDrop/DragDrop'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { SidebarElementType } from '../../../../types/types'

import s from './CalcOperations.module.scss'

export const calcOperations = ['/', 'x', '-', '+']

export const CalcOperations: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    dispatch(setOperation(e.currentTarget.innerText as OperationType))
  }

  return (
    <DragDrop
      id={id}
      disable={disableElement?.includes(id)}
      hideElement={arrayIDs?.length ? !arrayIDs?.includes(id) : false}
      forConstructor={forConstructor}
    >
      <div className={s.operations}>
        {calcOperations.map((el, index) => (
          <p key={index} onClick={handleClick}>
            {el}
          </p>
        ))}
      </div>
    </DragDrop>
  )
}
