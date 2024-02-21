import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Create from '../components/Create'
import Dashboard from '../components/Dashboard'
import Home from '../components/Home'
import Blog from '../components/Blog'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp';
import Header from '../components/Header'
import ForgetPassword from '../components/ForgetPassword'
import ResetPassword from '../components/ResetPassword'



function AppRoutes() {
  return <Routes>
       <Route path='/create' element={<><Header/><Create/></>} />   
       <Route path='/dashboard' element={<><Header/><Dashboard/></>} />
       <Route path='/home' element={<><Header/><Home/></>}/>
       <Route path='/blog/:id' element={<><Header/><Blog/></>} />
       <Route path='/signup' element={<SignUp/>} />
       <Route path='/forgetpassword' element={<ForgetPassword/>} />
       <Route path='/resetpassword' element={<ResetPassword/>} />
       <Route path='/' element={<SignIn/>} />
       <Route path='/*' element={<Navigate  to='/'/>} />
 </Routes>
}

export default AppRoutes