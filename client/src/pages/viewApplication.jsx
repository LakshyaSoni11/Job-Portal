import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/loadingComponent'

const ViewApplication = () => {
  const { backendUrl, companyToken, getUserApplications, userApplications, setUserApplications, } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  //fetch data from the backend
  const fetchCompanyApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )
      console.log("applicant data ", data.applications)
      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        await fetchCompanyApplications()
        // await getUserApplications();
        if(userApplications && userApplications.length > 0){
          const updateUserApplications = userApplications.map((app) => app._id == id ? {...app, status} : app)
          setUserApplications(updateUserApplications)
        }
        try {
          await getUserApplications()
        } catch (error) {
          console.error("Error refereshing the page", error)
          
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplications()
    }
  }, [companyToken])
  return applicants ? applicants.length === 0 ?(
    <div className='flex items-center justify-center h-[50vh]'>
    <p className='text-3xl'>No Jobs available or posted</p>
  </div>
  ) : (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 rounded-lg px-2 py-1'>
          <thead>
            <tr className='border-b px-2'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>User Name</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left'>Location</th>
              <th className='py-2 px-4 text-left'>Resume</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((value, idx) => (
              <tr key={idx} className="text-gray-700 hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b text-center text-sm">{idx + 1}</td>

                <td className="py-2 px-4 border-b flex items-center gap-2">
                  <img
                    src={value.userId.image}
                    className="w-8 h-8 rounded-full max-sm:hidden"
                    alt="img"
                  />
                  <span className="text-sm">{value.userId.name}</span>
                </td>

                <td className="py-2 px-4 text-center border-b text-sm max-sm:hidden">
                  {value.jobId.title}
                </td>

                <td className="py-2 px-4 text-center border-b text-sm max-sm:hidden">
                  {value.jobId.location}
                </td>

                <td className="py-2 px-4 border-b text-sm">
                  <a
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                    href={value.userId.resume || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                    <img src={assets.resume_download_icon} className="w-4 h-4" alt="download" />
                  </a>
                </td>

                <td className="py-2 px-4 border-b relative text-sm">
                  {value.status === "Pending" ?
                    <div className="relative inline-block text-left group">
                      <button className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded transition">
                        ⋯
                      </button>
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-10 hidden group-hover:block">
                        <button onClick={() => changeJobApplicationStatus(value._id, "Accepted")} className="block w-full text-left px-4 py-2 hover:bg-green-100 text-green-700">
                          Accept
                        </button>
                        <button onClick={() => changeJobApplicationStatus(value._id, "Rejected")} className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-700">
                          Reject
                        </button>
                      </div>
                    </div> :

                    <div className={value.status === "Accepted" ? 'text-green-500' : 'text-red-500'}>
                      {value.status}
                    </div>}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplication