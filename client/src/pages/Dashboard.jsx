import React from 'react'
import { assets } from '../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const Dashboard = () => {
  const navigate =useNavigate();
  return (
    <div className='min-h-screen'>
      <div className='shadow py-4'>
        <div className='flex items-center justify-between px-7'>
          <img onClick={e=> navigate('/')} className='cursor-pointer min-w-32' src={assets.logo} alt="logo" />
          <div className='flex items-center gap-3'>
            <p>Welcome ,LakshyaSoni</p>
            <div className='relative group'>
              <img className='rounded-full w-9 ' src={assets.company_icon} alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-15'>
                <ul className=' shadow p-3 rounded-md m-0 border bg-white'>
                  <li className='cursor-pointer text-sm font-black pr-10 '>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Side bar and right bar */}
      <div className='flex items-start'>
        <div className='inline-block min-h-screen border-r-2'>
          <ul className='flex flex-col items-start pt-4 text-gray-800'>
            <NavLink className={({isActive})=>`flex items-center p-4 gap-1 sm:p-6 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}  to={'/dashboard/add-jobs'}>
              <img src={assets.add_icon} alt="" />
              <p className='max-sm:hidden'>Add jobs</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center p-4 gap-1 sm:p-6 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
              <img src={assets.home_icon} alt="" />
              <p className='max-sm:hidden'>Manage jobs</p>
            </NavLink>

            <NavLink className={({isActive})=>`flex items-center p-4 gap-1 sm:p-6 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/viewApplication'}>
              <img src={assets.person_tick_icon} alt="" />
              <p className='max-sm:hidden'>View jobs</p>
            </NavLink>
          </ul>
        </div>
      <div>
        <Outlet />
      </div>
      </div>
    </div>

  )
}

export default Dashboard