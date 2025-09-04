import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplicationPage = () => {
    const {user} = useUser()
  const [showEdit, setShowEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const { backendUrl, fetchUserData, userData, userApplications, getUserApplications } = useContext(AppContext);
  const { getToken } = useAuth();
  
  const updateResume = async () => {
      try {
          const formData = new FormData()
          formData.append('resume', resume)
          const token = await getToken()
      const {data} = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        {headers:{Authorization: `Bearer ${token}`}}
    )
    if(data.success){
        toast.success(data.message)
        await fetchUserData()
    }
    else{
        toast.error(data.message)
    }
} catch (error) {
    toast.error(error.message);
}

setShowEdit(false);
setResume(null);
};
useEffect(()=>{
    if(user){
        getUserApplications()
    }
},[user])

// console.log(getUserApplications())
  return (
    <>
      <Navbar />
      <div className="containetr p-4 min-h-[66vh] 2xl:px-20 mx-auto my-10">
        <h2 className="font-bold text-2xl">My Resume</h2>

        <div>
          {showEdit || userData && userData.resume === "" ? (
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              {/* File input trigger */}
              <label
                htmlFor="resumeUpload"
                className="font-semibold text-lg border-2 cursor-pointer px-3 py-1 text-blue-500 bg-blue-100 rounded-xl"
              >
                {resume ? resume.name : 'Select Resume'}
              </label>
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                id="resumeUpload"
              />

              {/* Preview name */}
              <p className="text-gray-400">{resume ? resume.name : 'No file selected'}</p>

              <img src={assets.profile_upload_icon} alt="" />

              {/* Save + Cancel buttons */}
              <button
                onClick={updateResume}
                className="bg-green-50 text-green-500 px-3 py-1 rounded-xl border-2 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEdit(false);
                  setResume(null);
                }}
                className="bg-red-50 text-red-500 px-3 py-1 rounded-xl border-2 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-10 flex gap-3 items-center">
              {userData?.resume ? (
                <a
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 border-2 bg-blue-100 rounded-xl"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )}
              <button
                onClick={() => setShowEdit(true)}
                className="py-2 px-3 border-2 bg-gray-300 rounded-xl"
              >
                {userData?.resume ? 'Change Resume' : 'Upload Resume'}
              </button>
            </div>
          )}
        </div>

        <h2 className="mt-10 font-bold text-xl">Jobs Applied</h2>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Job Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userApplications?.map((job, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={job?.companyId?.image}
                      alt="logo"
                      className="w-10 h-10 object-contain rounded-md "
                    />
                    <span className="font-medium text-gray-800">{job?.companyId?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{job?.jobId?.title}</td>
                  <td className="px-6 py-4 text-gray-700">{job?.jobId?.location}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {moment(job.date, 'DD MMM, YYYY').format('ll')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full 
                        ${
                          job.status === 'Accepted'
                            ? 'bg-green-100 text-green-800'
                            : job.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
