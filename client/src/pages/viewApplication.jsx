import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplication = () => {
  return (
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
            {viewApplicationsPageData.map((value, idx) => (
              <tr key={idx} className="text-gray-700 hover:bg-gray-50 transition">
                <td className="py-2 px-4 border-b text-center text-sm">{idx + 1}</td>

                <td className="py-2 px-4 border-b flex items-center gap-2">
                  <img
                    src={value.imgSrc}
                    className="w-8 h-8 rounded-full max-sm:hidden"
                    alt="img"
                  />
                  <span className="text-sm">{value.name}</span>
                </td>

                <td className="py-2 px-4 text-center border-b text-sm max-sm:hidden">
                  {value.jobTitle}
                </td>

                <td className="py-2 px-4 text-center border-b text-sm max-sm:hidden">
                  {value.location}
                </td>

                <td className="py-2 px-4 border-b text-sm">
                  <a
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                    href={value.resumeLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                    <img src={assets.resume_download_icon} className="w-4 h-4" alt="download" />
                  </a>
                </td>

                <td className="py-2 px-4 border-b relative text-sm">
                  <div className="relative inline-block text-left group">
                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded transition">
                      ⋯
                    </button>
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-10 hidden group-hover:block">
                      <button className="block w-full text-left px-4 py-2 hover:bg-green-100 text-green-700">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-700">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ViewApplication