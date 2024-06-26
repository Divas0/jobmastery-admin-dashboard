import React from 'react'
import Login from './pages/login/Login'
import { Toaster } from 'sonner'
import AllRoute from './pages/routes/AllRoute'

const App = () => {
  return (<>
    <Toaster/>
    <AllRoute/>
    </>
  )
}

export default App