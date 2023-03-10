import { Header } from '../components/Header/Header'
import { CalcConstructor } from '../features/CalcConstructor/CalcConstructor'
import { SidebarContainer } from '../features/SidebarContainer/SidebarContainer'

import s from './App.module.scss'

function App() {
  return (
    <div className={s.app}>
      <div className={s.container}>
        <Header />
        <div className={s.content}>
          <SidebarContainer />
          <CalcConstructor />
        </div>
      </div>
    </div>
  )
}

export default App
