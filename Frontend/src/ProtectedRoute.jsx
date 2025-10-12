import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export const ProtectedRoute = (props) => {
  //verify the auth
 
  let {user,loading}=useAuth()
  const navigate=useNavigate()
  
  if(loading) return <h1>Loadng...........</h1>

  if(!user) return <Navigate to={"/login"} replace></Navigate>
  
    return(<>
    {props.children}
    </>)
 
  
}
