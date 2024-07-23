/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { SnackbarProvider } from 'notistack'

import App from './App'

import reportWebVitals from './reportWebVitals'
import store from './redux/store'

// import KeyClockConfig from './configs/keycloak'
// import { APP_CONFIGS } from './utils/constants'

import PrimaryTheme from './styles/theme/theme'
import './index.css'
import './styles/base/_base.scss'

function render () {
  const container = document.getElementById('root') as HTMLElement
  const root = createRoot(container)
  root.render(
    <Provider store={store}>
      <ThemeProvider theme={PrimaryTheme}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
  </Provider>
  )
}

render()
reportWebVitals()
