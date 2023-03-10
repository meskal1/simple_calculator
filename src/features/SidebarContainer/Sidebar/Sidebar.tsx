import { FC, memo } from 'react'

import { CalcOperations } from './CalcOperations/CalcOperations'
import { Equal } from './Equal/Equal'
import { Numbers } from './Numbers/Numbers'
import { Scoreboard } from './Scoreboard/Scoreboard'

type SidebarType = {
  forConstructor?: boolean
  elementsIdArray?: String[]
  disableElements?: String[]
}

const defaultOrder = ['1', '2', '3', '4']

export const Sidebar: FC<SidebarType> = memo(
  ({ forConstructor, elementsIdArray, disableElements }) => {
    const order = elementsIdArray?.length ? elementsIdArray : defaultOrder

    //TODO childrenWithProps
    return (
      <>
        {order.map((el, index) => {
          switch (el) {
            case '1':
              return (
                <Scoreboard
                  key={index}
                  id={'1'}
                  arrayIDs={elementsIdArray}
                  disableElement={disableElements}
                  forConstructor={forConstructor}
                />
              )
            case '2':
              return (
                <CalcOperations
                  key={index}
                  id={'2'}
                  arrayIDs={elementsIdArray}
                  disableElement={disableElements}
                  forConstructor={forConstructor}
                />
              )
            case '3':
              return (
                <Numbers
                  key={index}
                  id={'3'}
                  arrayIDs={elementsIdArray}
                  disableElement={disableElements}
                  forConstructor={forConstructor}
                />
              )
            case '4':
              return (
                <Equal
                  key={index}
                  id={'4'}
                  arrayIDs={elementsIdArray}
                  disableElement={disableElements}
                  forConstructor={forConstructor}
                />
              )
            default:
              return null
          }
        })}
      </>
    )
  }
)
