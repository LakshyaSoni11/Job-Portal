import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, jobsData } from '../assets/assets'
import Loading from '../components/loadingComponent'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert';
import moment from 'moment'
import ReactTextFormat from 'react-text-format';
import JobCard from '../components/jobCard'
import Footer from '../components/footer'
const ApplyPage = () => {
    const [AppliedJobData, setAppliedJobData] = useState()
    const { jobs } = useContext(AppContext)
    const { id } = useParams()
    const fetchJob = () => {
        const data = jobs.filter(job => job._id === id)
        console.log(data[0])
        setAppliedJobData(data[0])
    }
    useEffect(() => {
        fetchJob();
    }, [jobs, id])
    return jobsData ? (
        <>
            <Navbar />
            <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-20 container mx-auto">
                <div className="w-full bg-blue-50 border-2 border-blue-400 rounded-xl  flex flex-col items-center px-6 py-8 lg:flex-row justify-between gap-6">

                    {/* Left Section */}
                    <div className="w-full lg:w-3/4 flex flex-col items-center lg:items-start text-gray-700">
                        {/* Image */}
                        <img
                            className="h-24 w-24 bg-white border p-2 rounded-xl object-contain mb-4"
                            src={assets.company_icon}
                            alt="Company Icon"
                        />

                        {/* Job Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-black text-center lg:text-left">
                            {AppliedJobData?.title}
                        </h1>

                        {/* Job Details */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <img src={assets.suitcase_icon} alt="" className="h-5" />
                                <span>{AppliedJobData?.companyId?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={assets.location_icon} alt="" className="h-5" />
                                <span>{AppliedJobData?.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={assets.person_icon} alt="" className="h-5" />
                                <span>{AppliedJobData?.level}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={assets.money_icon} alt="" className="h-5" />
                                <span>{kconvert.convertTo(AppliedJobData?.salary)}</span>
                            </div>
                        </div>
                    </div>

                    {/*  Button + Time */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-end items-center lg:items-end mt-4 lg:mt-0">
                        <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition">
                            Apply Now
                        </button>
                        <p className="text-gray-500 mt-2 text-sm">
                            {moment(AppliedJobData?.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between items-start'>
                    <div className='w-full lg:w-2/3 mt-10'>
                        <h1 className='text-2xl font-bold'>Job description</h1>
                        <ReactTextFormat>
                            <div className='custom-description' dangerouslySetInnerHTML={{ __html: AppliedJobData?.description }}></div>
                        </ReactTextFormat>
                        <button className='border-blue-500 bg-blue-500 px-2 py-1 text-white rounded-md mt-10'>Apply Now</button>

                    </div>
                {/* SidejobBox */}
                <div className='w-full lg:w-1/3 mt-10 ml-10 space-y-10'>
                    <h2 className='text-2xl'>Find more jobs related to {AppliedJobData?.companyId?.name}</h2>
                    {jobs
                        .filter(job => job._id !== AppliedJobData?._id && job.companyId._id === AppliedJobData?.companyId._id)
                        .filter(job => true).slice(0,4)
                        .map((job,idx)=><JobCard key={idx} job={job}/>)
                    }
                </div>
                    </div>
            </div>
            <Footer />
        </>

    )
        : (
            <Loading />
        )
}

export default ApplyPage