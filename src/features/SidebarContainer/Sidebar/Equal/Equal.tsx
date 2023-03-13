import { FC } from 'react'

import { setCalculations, setResetNewFirstNumber, setResult } from '../../../../app/appSlice'
import { DragDrop } from '../../../../common/components/DragDrop/DragDrop'
import { SidebarElementType } from '../../../../common/types/types'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { calculations } from '../../../../utils/calculations'

import s from './Equal.module.scss'

export const Equal: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()
  const calcNumbers = useAppSelector(store => store.app.calcValues.calcNumbers)

  const handleClick = () => {
    const numberOne = calcNumbers[0]
    const operation = calcNumbers[1]

    if (numberOne && operation && numberOne !== 'Не определено') {
      const calcResult = calculations(calcNumbers)

      if (operation) {
        dispatch(setResult(calcResult))
        const calcArray = [...calcNumbers]

        calcArray[0] = calcResult
        calcArray[3] = '='

        dispatch(setResetNewFirstNumber())
        dispatch(setCalculations(calcArray))
      }
    }
  }

  return (
    <DragDrop
      id={id}
      disable={disableElement?.includes(id)}
      hideElement={arrayIDs?.length ? !arrayIDs?.includes(id) : false}
      forConstructor={forConstructor}
    >
      <div className={s.equal} onClick={handleClick}>
        =
      </div>
    </DragDrop>
  )
}
