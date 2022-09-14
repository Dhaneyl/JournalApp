import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoute } from '../journal/routes/JournalRoute'

export const AppRouter = () => {
  return (
    <Routes>
    {/* Login and Register */}
      <Route path='/auth/*' element={<AuthRoutes/>}/>

      {/* JournalApp */}
      <Route path='/*' element={<JournalRoute/>}/>
    </Routes>
  )
}


