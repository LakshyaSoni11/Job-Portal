 import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import Loading from '../components/loadingComponent'
const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false)
  const {backendUrl, companyToken} = useContext(AppContext)
  const fetchCompanyJobs = async() =>{
   try {
     const {data} = await axios.get(backendUrl + "/api/company/list-jobs",{headers:{token:companyToken}})
    if(data.success){
      setJobs(data.jobsData.reverse());
      // console.log(data.jobsData)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
    
   }
  }

  const changeJobVisibility = async (id) =>{
    try {
      const {data} = await axios.post(backendUrl + "/api/company/change-visibility",
      {id},
      {
        headers:{token: companyToken}
      }
    )
  if(data.success){
    toast.success(data.message)
    fetchCompanyJobs()
  }
  else{
    toast.error(data.message)
  }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(companyToken){
      fetchCompanyJobs()
    }
  },[companyToken])
  return jobs ? jobs.length === 0 ? (
  <div className='flex items-center justify-center h-[50vh]'>
    <p className='text-3xl'>No Jobs available or posted</p>
  </div>) :(
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
            {jobs.map((jobs,idx)=>(
              <tr key={idx}>
                <td className='py-2 px-4 text-left border-b'>{idx+1}</td>
                <td className='py-2 px-4 text-left border-b'>{jobs.title}</td>
                <td className='py-2 px-4 text-left border-b'>{jobs.location}</td>
                <td className='py-2 px-4 text-left border-b'>{moment(jobs.date).format('ll')}</td>
                <td className='py-2 px-4 text-center border-b'>{jobs.applicants}</td>
                <td className='py-2 px-4 text-center scale-100 border-b'><input onChange={()=>changeJobVisibility(jobs._id)} type="checkbox" checked={jobs.visible} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end'>
        <button onClick={()=>navigate('/dashboard/add-jobs')} className='px-5 py-1 border-1 bg-gray-800 text-white text-center rounded-md text-lg'>Add New Job</button>
      </div>
    </div>

  ):<Loading />
}

export default ManageJobs