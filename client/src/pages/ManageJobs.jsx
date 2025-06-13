import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
const ManageJobs = () => {
  const navigate = useNavigate()
  return (
    <div className='container max-w-5xl'>
      <div className='overflow-x-auto m-10  overflow-hidden'>
        <table className='min-w-full border border-gray-300 bg-white rounded-lg '>
          <thead>
            <tr className='border-b border-gray-300'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left'>Applicants</th>
              <th className='py-2 px-4 text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((jobs,idx)=>(
              <tr key={idx}>
                <td className='py-2 px-4 text-left border-b'>{idx+1}</td>
                <td className='py-2 px-4 text-left border-b'>{jobs.title}</td>
                <td className='py-2 px-4 text-left border-b'>{jobs.location}</td>
                <td className='py-2 px-4 text-left border-b'>{moment(jobs.date).format('ll')}</td>
                <td className='py-2 px-4 text-center border-b'>{jobs.applicants}</td>
                <td className='py-2 px-4 text-center scale-100 border-b'><input type="checkbox" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        <button onClick={()=>navigate('/dashboard/add-jobs')} className='px-5 py-1 border-1 bg-gray-800 text-white text-center rounded-md text-lg'>Add New Job</button>
      </div>
    </div>

  )
}

export default ManageJobs