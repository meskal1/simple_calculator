import { FC, useState } from 'react'

import { setCalculations, setResult } from '../../../../app/appSlice'
import { DragDrop } from '../../../../components/DragDrop/DragDrop'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useEffectAfterMount } from '../../../../hooks/useEffectAfterMount'
import { SidebarElementType } from '../../../../types/types'
import { calculations } from '../../../../utils/calculations'

import s from './Equal.module.scss'

export const Equal: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const dispatch = useAppDispatch()
  const operation = useAppSelector(store => store.app.calcValues.operation)
  const calcNumbers = useAppSelector(store => store.app.calcValues.calcNumbers)
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)
  const [memoNumber, setMemoNumber] = useState('')

  const handleClick = () => {
    if (calcNumbers[0] !== '' && operation) {
      if (!calcNumbers[1] && !memoNumber) {
        setMemoNumber(calcNumbers[0])
        //   console.log('memoNumber', memoNumber) //TODO
      }

      const calcResult = calculations(
        operation,
        calcNumbers[0],
        calcNumbers[1] || memoNumber || calcNumbers[0]
      )

      if (operation) {
        //   console.log(calcResult) //TODO
        dispatch(setResult(calcResult))
        const calcArray = [...calcNumbers]

        calcArray[0] = calcResult
        dispatch(setCalculations(calcArray))
      }
    }
  }

  useEffectAfterMount(() => {
    setMemoNumber('')
  }, [isInRuntime])

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
