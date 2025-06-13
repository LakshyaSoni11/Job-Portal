import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const {setSearchFilter,setIsSearched} = useContext(AppContext)
    const titleRef = useRef(null)
    const locationRef = useRef(null)
    const handleSearch =() =>{
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
        console.log({
        title: titleRef.current.value,
        location: locationRef.current.value})
    }


  return (
    <div className='container mx-auto 2xl:px-30 my-10'>
        <div className='border-2 my-2 py-15 text-center rounded-xl max-w-7xl'>
            <h2>Over 10,000 jobs are their</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, eaque. Voluptate, itaque.</p>
            <div className='flex items-center justify-between px-3 mt-3 rounded pl-4 mx-4 sm:mx-auto text-gray-600 max-w-2xl py-1 border-2'>
                <div className='flex items-center gap-1'>
                    <img src={assets.search_icon} alt="icon" />
                    <input type="text"
                     placeholder='Search for Job' 
                     ref={titleRef}
                    className='max-sm:text-xl rounded outline-none '/>
                </div>
                <div className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="icon" />
                    <input type="text"
                     placeholder='Location' 
                     ref={locationRef}
                    className='max-sm:text-xl rounded outline-none '/>
                </div>
                <div>
                    <button className='bg-blue-700 rounded-xl text-white px-5 py-2' onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
        <div className='border border-gray-400 mt-9 p-4 rounded-xl'>
            <div className='flex justify-center gap-10 lg:gap-10 flex-wrap'>
                <p className='font-medium'>Trusted by</p>
                <img src={assets.accenture_logo} className='h-6' alt="companyIcon" />
                <img src={assets.walmart_logo} className='h-6' alt="companyIcon" />
                <img src={assets.samsung_logo} className='h-6' alt="companyIcon" />
                <img src={assets.microsoft_logo} className='h-6' alt="companyIcon" />
                <img src={assets.adobe_logo} className='h-6' alt="companyIcon" />
                <img src={assets.amazon_logo} className='h-6' alt="companyIcon" />
            </div>
        </div>
    </div>
  )
}

export default Hero