/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactGA from 'react-ga4'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import { useSnackBar } from './utils/helpers'

import ENV from './.env'

// Import the ChatBot component
import ChatBot from './pages/ChatBot/Chatbot'

/** Initialized google analytics */
ReactGA.initialize(ENV.TRACKING_ID)

function App () {
  const queryClient = new QueryClient()
  useSnackBar()
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
              {/* Rendering routes */}
            {routes.map((route: any, index: string) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* New route for ChatBot */}
            <Route path="/chatbots" element={<ChatBot />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App
