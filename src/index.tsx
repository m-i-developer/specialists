import './index.css'

import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { RootStore } from './store/rootStore'
import { theme } from './theme'
import { IStore } from './store/rootStore.types'

const { worker } = require('./mocks/browser')
worker.start({
  onUnhandledRequest: 'bypass',
})

const rootStore = new RootStore()

export const Context = createContext<IStore>({ rootStore })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{ rootStore }}>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </ThemeProvider>
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
