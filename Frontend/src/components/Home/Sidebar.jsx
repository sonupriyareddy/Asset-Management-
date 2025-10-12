import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Sidebar() {
  const {logout}=useAuth()
  const navigate=useNavigate()
  const handleLogout=async()=>{
    await logout();
 navigate("/login")

  }
  return (
    <>
   <aside className={"flex flex-col py-10 gap-4 items-center h-full"}>
    <div>
      <h1 className={"text-red-600 text-2xl text-center font-bold"}>MY COMPANY</h1>
    </div>
    <div className={" flex flex-col py-4 px-2 w-4/5 justify-center gap-8"}>
      <Link to="/" className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold cursor-pointer hover:bg-gray-200'>Dashboard</Link>

      <Link to="/assets" className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold cursor-pointer hover:bg-gray-200'>Assets</Link>
      <Link to="/employees" className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold cursor-pointer hover:bg-gray-200'>Employees</Link>
      <Link to="/assigned-assets" className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold cursor-pointer hover:bg-gray-200'>Assigned Assets</Link>
      
    </div>
    <div className='flex flex-col py-4 px-2 w-4/5 flex-1 justify-end items-center gap-4'>
      <Link to={""} className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold w-full hover:bg-gray-200'>Profile</Link>
      <button className='bg-red-500 rounded-2xl h-10 w-1/2 text-xl font-semibold text-white cursor-pointer hover:bg-white
      hover:text-red-500' onClick={handleLogout}>Logout</button>
    </div>
   </aside>
    
    
    </>
  )
}

export default Sidebar