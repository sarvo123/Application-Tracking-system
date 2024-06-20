import { useState } from 'react'
import { Navigate ,Route ,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {

  const {authUser} = useAuthContext();

  return (
    <div>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to='/'/> : <Signup />}/>
    </Routes>
    <Toaster/>
    </div>
  )
};

export default App
