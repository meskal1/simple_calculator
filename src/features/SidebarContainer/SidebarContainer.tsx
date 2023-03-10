import { FC } from 'react'

import { useAppSelector } from '../../hooks/useAppSelector'

import { Sidebar } from './Sidebar/Sidebar'
import s from './SidebarContainer.module.scss'

type SidebarContainerType = {}

export const SidebarContainer: FC<SidebarContainerType> = ({}) => {
  const elementsIDs = useAppSelector(store => store.app.elementsIDs)
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)

  return (
    <div className={`${s.sideBar} ${isInRuntime && s.runtimeMode}`}>
      <Sidebar disableElements={elementsIDs} />
    </div>
  )
}
