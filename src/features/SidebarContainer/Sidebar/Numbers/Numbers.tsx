import { FC, MouseEvent } from 'react'

import { setCalculations, setResult } from '../../../../app/appSlice'
import { DragDrop } from '../../../../common/components/DragDrop/DragDrop'
import { SidebarElementType } from '../../../../common/types/types'
import { DISPLAY } from '../../../../constants/maxDisplayNumer.enum'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { convertValue, replaceZero } from '../../../../utils/calcUtils'

import s from './Numbers.module.scss'

const calcValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']

export const Numbers: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()
  const result = useAppSelector(store => store.app.calcValues.result)
  const calcNumbers = useAppSelector(store => store.app.calcValues.calcNumbers)
  const newFirstNumber = useAppSelector(store => store.app.calcValues.newFirstNumber)
  const operation = calcNumbers[1]
  const equal = calcNumbers[3]

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    const calcArray = [...calcNumbers]
    const value = e.currentTarget.innerText
    const convertedValue = convertValue(result, value, calcNumbers)
    const addZero = convertedValue === '.' ? '0.' : convertedValue

    if (result.length < DISPLAY.MAX) {
      if (result === 'Не определено' || (result === '0' && !calcNumbers.length)) {
        dispatch(setCalculations([addZero]))
        dispatch(setResult(addZero))

        return
      }

      if (equal) {
        if (newFirstNumber !== '') {
          calcArray[0] =
            newFirstNumber.includes('.') && convertedValue === '.'
              ? newFirstNumber
              : newFirstNumber + convertedValue
        } else {
          calcArray[0] = convertedValue === '.' ? '0.' : newFirstNumber + convertedValue
        }

        dispatch(setResult(calcArray[0]))
        dispatch(setCalculations(calcArray))

        return
      }

      if (!operation) {
        dispatch(setCalculations([replaceZero(result, convertedValue) + convertedValue]))
        dispatch(setResult(replaceZero(result, convertedValue) + convertedValue))
      } else {
        calcArray[2] =
          calcArray[0] === calcArray[2]
            ? addZero
            : replaceZero(calcArray[2], convertedValue) + convertedValue

        dispatch(setResult(calcArray[2]))
        dispatch(setCalculations(calcArray))
      }
    } else if (result.length === DISPLAY.MAX) {
      if (equal && newFirstNumber === '') {
        calcArray[0] = convertedValue === '.' ? '0.' : newFirstNumber + convertedValue

        dispatch(setResult(calcArray[0]))
        dispatch(setCalculations(calcArray))

        return
      }

      if (operation) {
        calcArray[2] =
          calcArray[0] === calcArray[2]
            ? addZero
            : replaceZero(calcArray[2], convertedValue) + convertedValue

        dispatch(setResult(calcArray[2]))
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
      <div className={s.numbers}>
        {calcValues.map((el, index) => (
          <p key={index} onClick={handleClick}>
            {el}
          </p>
        ))}
      </div>
    </DragDrop>
  )
}
