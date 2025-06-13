import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className=' container mx-auto my-20 py-4 2xl:px-20'>
        <div className=' bg-gray-300 px-10 py-15 rounded '>
            <div className=' flex items-center justify-center flex-col gap-5 '>
                <h1 className='text-3xl '>Download this app from play store or app store</h1>
        <div className='flex items-center gap-4 '>
           <a href="#">
             <img src={assets.play_store} alt="" />
           </a>
           <a href="#">
             <img src={assets.app_store} alt="" />
           </a>
        </div>
            </div>
        </div>
    </div>
  )
}

export default AppDownload