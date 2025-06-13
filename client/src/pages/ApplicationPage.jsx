import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'

const ApplicationPage = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [resume, setResume] = useState(null)
    return (
        <>
            <Navbar />
            <div className='containetr p-4 min-h-[66vh] 2xl:px-20 mx-auto my-10'>
                <h2 className='font-bold text-2xl'>My Resume</h2>
                <div className=''>{
                    showEdit ?
                        <>
                            <label htmlFor="resumeUpload" className='flex items-center gap-2 mt-4'>
                                <p className='font-semibold text-lg border-2 cursor-pointer px-3 py-1 text-blue-500 bg-blue-100 rounded-xl'>Select file</p>
                                <div className='flex flex-col'>
                                    <input type="file" hidden accept='application/pdf' onChange={e => { setResume(e.target.files[0]) }} id='resumeUpload' />
                                    <p className='text-gray-400'>{resume ? resume.name : "No files selected"}</p>
                                </div>
                                <img src={assets.profile_upload_icon} alt="" />
                                <button onClick={e => setShowEdit(false)} className='bg-green-50 text-green-500 px-2 py-1 rounded-xl border-2 cursor-pointer'>Save</button>
                            </label>

                        </>

                        :
                        <div className='mt-10 flex gap-3'>
                            <a href="" className='px-3 py-2 border-2 bg-blue-100 rounded-xl'>Resume</a>
                            <button onClick={() => setShowEdit(true)} className='py-2 px-3 border-2 bg-gray-300 rounded-xl'>Edit</button>
                        </div>

                }
                </div>
                <h2>Jobs Applied</h2>
                <div className="overflow-x-auto mt-10">
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
                            {jobsApplied?.map((job, idx) => (
                                <tr key={idx} className="hover:bg-blue-50 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={job.logo} alt="logo" className="w-10 h-10 object-contain rounded-md border" />
                                        <span className="font-medium text-gray-800">{job.company}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{job.title}</td>
                                    <td className="px-6 py-4 text-gray-700">{job.location}</td>
                                    <td className="px-6 py-4 text-gray-500">{moment(job.date).format('ll')}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-sm font-medium rounded-full 
                                             ${job.status === 'Accepted'
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
    )
}

export default ApplicationPage