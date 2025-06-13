import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { UserButton,useClerk, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Navbar = () => {
    const {openSignIn} = useClerk();
    const {user} = useUser();
    const {setRecruterLogin} = useContext(AppContext)
  return (
    <div className='shadow-xl py-4'>
        <div className='container flex justify-between items-center px-3'>
            <img src={assets.logo} alt="Logo" />
            {user? <div className='flex items-center gap-3'>
                <Link to= '/applications' className='underline'>Applied Jobs</Link>
                <p>|</p>
                <p className='max-sm:hidden'>Hi, {user.firstName +" "+user.lastName}</p>
                <UserButton />
            </div>
            :<div className='flex gap-4'>
                <button onClick={e=>{setRecruterLogin(true)}} className='text-gray-500'>RecruterLogin</button>
                <button onClick={ e =>openSignIn()} className='bg-blue-700 text-white px-5 py-2 rounded-4xl'>Login</button>
            </div>

            }
        </div>
    </div>
  )
}

export default Navbar