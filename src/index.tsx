import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app/App'
import { store } from './app/store'
import './analytics/analytics'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
