import { FC, MouseEvent, useState } from 'react'

import { setCalculations, setResetCalcValues, setResult } from '../../../../app/appSlice'
import { DragDrop } from '../../../../components/DragDrop/DragDrop'
import { PATH } from '../../../../constants/maxDisplayNumer.enum'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useEffectAfterMount } from '../../../../hooks/useEffectAfterMount'
import { SidebarElementType } from '../../../../types/types'

import s from './Numbers.module.scss'

const calcValues = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ',']

export const Numbers: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)
  const operation = useAppSelector(store => store.app.calcValues.operation)
  const calcNumbers = useAppSelector(store => store.app.calcValues.calcNumbers)
  const [currentValue, setCurrentValue] = useState('')

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    const value = e.currentTarget.innerText

    if (calcNumbers[0] === 'Не определено' || calcNumbers.length === 2) {
      setCurrentValue('')
      dispatch(setResetCalcValues())
    }

    if (currentValue === '0' && value === '0') return

    if (currentValue.length < PATH.MAX) {
      setCurrentValue(prevValue => {
        const convertedValue =
          value === ',' && prevValue.split('').includes('.') ? '' : value.replace(',', '.')

        return prevValue + (prevValue === '' && convertedValue === '.' ? '0.' : convertedValue)
      })
    }
  }

  useEffectAfterMount(() => {
    if (!isInRuntime && currentValue !== '') {
      setCurrentValue('')
    }
  }, [isInRuntime])

  useEffectAfterMount(() => {
    if (operation && currentValue !== '') {
      setCurrentValue('')
    }
  }, [operation])

  //   console.log('calcNumbers', calcNumbers) //TODO

  useEffectAfterMount(() => {
    if (currentValue !== '') {
      dispatch(setResult(currentValue))
    }

    if (currentValue !== '') {
      if (!operation) {
        dispatch(setCalculations([currentValue]))
      }

      if (operation) {
        const calcArray = [...calcNumbers]

        calcArray[1] = currentValue
        dispatch(setCalculations(calcArray))
      }
    }
  }, [currentValue])

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
