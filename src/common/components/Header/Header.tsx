import { setIsInRuntime, setResetCalcValues } from '../../../app/appSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'

import s from './Header.module.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const isInRuntime = useAppSelector(store => store.app.isInRuntime)

  const handleRuntimeMode = () => {
    if (!isInRuntime) {
      dispatch(setIsInRuntime(true))
    }
  }

  const handleConstructorMode = () => {
    if (isInRuntime) {
      dispatch(setIsInRuntime(false))
      dispatch(setResetCalcValues())
    }
  }

  return (
    <header className={s.header}>
      <div className={s.runtimeSwitcher}>
        <button
          className={`${s.runtimeButton} ${isInRuntime && s.runtimeActive}`}
          onClick={handleRuntimeMode}
        >
          Runtime
        </button>
        <button
          className={`${s.constructorButton} ${!isInRuntime && s.constructorActive}`}
          onClick={handleConstructorMode}
        >
          Constructor
        </button>
      </div>
    </header>
  )
}
