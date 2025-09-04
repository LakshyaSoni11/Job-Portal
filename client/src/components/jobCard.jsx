import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const JobCard = ({job}) => {
    const Navigate = useNavigate()
  return (
    <div className='border rounded-2xl px-3 py-2 shadow-lg mt-10'>
        <div className='flex items-center justify-between'>
            <img src={job.companyId.image} alt="icon" />
        </div>
        <h4 className='text-xl font-semibold'>{job.title}</h4>
        <div className='flex items-center gap-3 m-2'>
            <span className='inline-flex items-center gap-3 border border-blue-400 bg-blue-100 text-black rounded-md px-4 py-1.5'>{job.level}</span>
            <span className='inline-flex items-center gap-3 border border-red-400 bg-red-100 text-black rounded-md px-4 py-1.5'>{job.location}</span>
        </div>
        <p dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}} className='text-sm mt-4 texrt-gray-500'></p>
        <div className='flex items-center gap-3 mt-5 justify-center'>
            <button onClick={()=>{Navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='border-blue-500 bg-blue-500 px-2 py-1 text-white rounded-md'>Apply Now</button>
            <button onClick={()=>{Navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='border-gray-700 bg-gray-300 px-2 py-1 rounded-md'>Learn more</button>
        </div>
        </div>
  )
}

export default JobCard