import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import Start from '../pages/Start';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />}></Route>
      {/* <Route path='/login' element={<UserLogin />}></Route>
      <Route path='/signup' element={<UserSignup />}></Route>
      <Route path='/captain-login' element={<CaptainLogin />}></Route>
      <Route path='/captain-signup' element={<CaptainSignup />}></Route>
      <Route path='/home' element={<UserProtectWrapper>
        <Home />
      </UserProtectWrapper>}></Route>
      <Route path='/user/logout' element={
        <UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>
      }></Route>
      <Route path='/captain-home' element={
        <CaptainProtectWrapper>
          <CaptainHome />
        </CaptainProtectWrapper>}></Route>

      <Route path='/riding' element={<Riding></Riding>}></Route>
      <Route path='/captain-riding' element={<CaptainRiding></CaptainRiding>}></Route> */}
    </Routes>
  )
}

export default App;