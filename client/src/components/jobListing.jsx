import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './jobCard'


const JobListing = () => {
    const {isSearched , searchedfilter , setSearchFilter , jobs} = useContext(AppContext)
    const [searchFilter ,showSearchFilter] = useState(true)
    const [currentPage ,setCurrentPage] = useState(1)
    const [jobCategory ,setJobCategory] = useState([])
    const [jobLocation , setJobLocation] = useState([])
    const [jobfilter , setJobFilter] = useState(jobs)

    const handleCategoryChange =(jobCategory) =>{
        setJobCategory(
            prev=>prev.includes(jobCategory) ? prev.filter(c => c!= jobCategory) : [...prev,jobCategory]
        )
    }
    const handleLocationChange =(jobLocation) =>{
        setJobLocation(
            prev=>prev.includes(jobLocation) ? prev.filter(location => location!= jobLocation)  :[...prev,jobLocation]
        )
    }
    useEffect(()=>{
        const mathcCategories = job => jobCategory.length === 0 || jobCategory.includes(job.category)
        const matchLocation = job => jobLocation.length === 0 || jobLocation.includes(job.location)
        const matchSearchTitle = job => searchedfilter.title === "" || job.title.toLowerCase().includes(searchedfilter.title.toLowerCase())
        const matchSearchLocation = job =>searchedfilter.location === "" || job.location.toLowerCase().includes(searchedfilter.title.toLowerCase())
        //reverse so that we can get the latest updated jobs
        const newFilterJob = jobs.slice().reverse().filter(
            job =>matchSearchLocation(job) && matchSearchTitle(job) && matchLocation(job) && mathcCategories(job)
        )
        setJobFilter(newFilterJob)
        //reveert back to page1
        setCurrentPage(1)
    },[jobs,jobLocation,jobCategory,searchedfilter])
  return (
    <div className='container flex flex-col 2xl:px-20 lg:flex-row max-lg:space-y-8 py-8'>
        <div>
            {/* if searcharea is not empty  */}
            {isSearched && (searchedfilter.title != "" || searchedfilter.location != "")&&(
                <>
                <h3 className='font-bold text-xl'>Current Search</h3>
                <div className='w-full lg:w-1/4 px-4  '>
                    {searchedfilter.title && (
                        <span className='inline-flex items-center gap-3 border border-gray-400 bg-gray-100 text-black rounded-md px-4 py-1.5'>
                            {searchedfilter.title}
                            <img src={assets.cross_icon} onClick={e =>setSearchFilter(prev => ({...prev , title: ""})) } className='cursor-pointer' alt="" />
                        </span>
                    )}
                    {searchedfilter.location && (
                        <span className='inline-flex ml-2 items-center gap-3 border border-red-400 bg-red-100 text-black rounded-md px-4 py-1.5'>
                            {searchedfilter.location}
                            <img src={assets.cross_icon} onClick={e =>setSearchFilter(prev =>({...prev , location: ""}))} className='cursor-pointer' alt="" />
                        </span>
                    )}
                </div>
                </>
            )
            }
            <button className='border rounded-md px-2 lg:hidden ' onClick={e=>showSearchFilter(prev=> !prev )}>
                {searchFilter? 'close': 'Filters'}
            </button>
            {/* search bu title */}
            <div className={searchFilter? "":'max-lg:hidden'}>
                <h4 className='font-medium text-lg py-4'>Search by categories</h4>
                <ul className='text-gray-600 space-y-4'>
                    {
                        JobCategories.map((val,idx)=>(
                            <li key={idx} className='flex gap-3 items-center'>
                                <input type="checkbox" onChange={()=>handleCategoryChange(val)} checked={jobCategory.includes(val)}/>
                                {val}
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/*search by location */}
            <div className={searchFilter? "":'max-lg:hidden'}>
                <h4 className='font-medium text-lg py-4'>Search by Locations</h4>
                <ul className='text-gray-600 space-y-4'>
                    {
                        JobLocations.map((val,idx)=>(
                            <li key={idx} className='flex gap-3 items-center'>
                                <input type="checkbox" onChange={()=>handleLocationChange(val)}
                                checked={jobLocation.includes(val)}
                                />
                                {val}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
        <section className='w-full lg:w-3/4 max-lg:px-4 ml-15'>
            <h3 className='text-4xl font-semibold m-2 ' id='job-page'>Latest Job</h3>
            <p className='text-2xl text-gray-500 m-2 '>Search by desired Job</p>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {jobfilter.slice((currentPage-1)*9 , currentPage*9).map((val,idx)=>(
                    <JobCard job={val} key={idx} />
                ))}

            </div>
            {jobfilter.length >0 && (
                <div className='flex items-center justify-center space-x-3 mt-10 '>
                    <a href="#job-page" >
                        <img onClick={()=>setCurrentPage(Math.max(currentPage-1,1))} src={assets.left_arrow_icon} alt="e" />
                    </a>
                    {Array.from({length:Math.ceil(jobfilter.length/9)}).map((_,idx)=>(
                      <a key={idx} href="#job-page">
                          <button className={`flex items-center justify-center border h-10 w-10 rounded ${currentPage === idx+1 ? 'bg-blue-100 border-1' : ''}`} onClick={e=>setCurrentPage(idx+1)}>{idx + 1}</button>
                      </a>
                    ))}
                    <a href="#job-page">
                        <img onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(jobfilter.length /9)))} src={assets.right_arrow_icon} alt="e" />
                    </a>
                </div>

            )

            }
        </section>
    </div>
  )
}

export default JobListing