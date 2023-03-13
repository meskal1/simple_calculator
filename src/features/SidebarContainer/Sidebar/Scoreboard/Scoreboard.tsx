import { FC } from 'react'

import { DragDrop } from '../../../../common/components/DragDrop/DragDrop'
import { SidebarElementType } from '../../../../common/types/types'
import { useAppSelector } from '../../../../hooks/useAppSelector'

import s from './Scoreboard.module.scss'

export const Scoreboard: FC<SidebarElementType> = ({
  id,
  arrayIDs,
  disableElement,
  forConstructor = false,
}) => {
  const result = useAppSelector(store => store.app.calcValues.result)

  const scoreboardStyle = () => {
    switch (result.length) {
      case 17:
        return s.size17
      case 16:
        return s.size16
      case 15:
        return s.size15
      case 14:
        return s.size14
      case 13:
        return s.size13
      case 12:
        return s.size12
      case 11:
        return s.size11
      case 10:
        return s.size10
      default:
        return result.length > 17 ? s.size17 : ''
    }
  }

  return (
    <DragDrop
      id={id}
      disable={disableElement?.includes(id)}
      hideElement={arrayIDs?.length ? !arrayIDs?.includes(id) : false}
      forConstructor={forConstructor}
    >
      <div className={`${s.scoreboard} ${scoreboardStyle()}`}>
        <div className={result.length > 17 ? s.numbers : ''}>{result.replace('.', ',')}</div>
      </div>
    </DragDrop>
  )
}
