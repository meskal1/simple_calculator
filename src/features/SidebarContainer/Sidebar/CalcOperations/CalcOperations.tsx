import { FC, MouseEvent } from 'react'

import { OperationType, setCalculations, setResetCalcValues } from '../../../../app/appSlice'
import { DragDrop } from '../../../../common/components/DragDrop/DragDrop'
import { SidebarElementType } from '../../../../common/types/types'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'

import s from './CalcOperations.module.scss'

export const calcOperations = ['/', 'x', '-', '+']

export const CalcOperations: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()
  const calcNumbers = useAppSelector(store => store.app.calcValues.calcNumbers)
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)
  const numberOne = calcNumbers[0]

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    if (numberOne === 'Не определено') return

    const value = e.currentTarget.innerText as OperationType
    const calcArray = [...calcNumbers]

    if (!calcNumbers.length) {
      dispatch(setCalculations(['0', value, '0']))

      return
    }

    if (calcNumbers.length !== 0) {
      calcArray[1] = value

      if (calcArray[0].length <= 17) {
        calcArray[2] = calcArray[0]
      }

      if (calcArray[3]) {
        calcArray.pop()
      }

      dispatch(setCalculations(calcArray))

      return
    }

    dispatch(setCalculations(calcArray))
  }

  const handleReset = () => dispatch(setResetCalcValues())

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
        {isInRuntime && (
          <p className={s.reset} onClick={handleReset}>
            C
          </p>
        )}
      </div>
    </DragDrop>
  )
}
