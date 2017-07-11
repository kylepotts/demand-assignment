import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store/configureStore'
import App from './App'
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css'
import './css/index.css'

const target = document.getElementById('root')

render(
  <Provider store={store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</Provider>, target)
registerServiceWorker()