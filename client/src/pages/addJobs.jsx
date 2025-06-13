import Quill from 'quill'
import React, { useEffect, useRef, useState } from 'react'
import  'quill/dist/quill.snow.css' 
import { JobCategories, JobLocations } from '../assets/assets'
const AddJobs = () => {
  const [jobTitle , setJobTitle] = useState('')
  const [jobLocation,setJobLocation] = useState('Bangalore')
  const [jobCategory , setJobCategory] = useState('Programming')
  const [level , setLevel] = useState('')
  const [salary , setSalary] = useState(0)

  const editorRef = useRef(null)
  const quillRef = useRef(null)
  useEffect(()=>{
    if( !quillRef.current && editorRef.current ){
      quillRef.current = new Quill(editorRef.current,{theme:'snow'})
    }
  })
  return (
    <form className='container flex flex-col p-4  items-start gap-5 w-full'>
        <div className='w-full'>
          <p className='font-semibold mb-2'>Job Title</p>
          <input type="text" placeholder='Type Here' onChange={e=>setJobTitle(e.target.value)} value={jobTitle} className='w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1' required />
        </div>
        <div className='w-full border-2 border-gray-300 rounded-md'>
          <p className='font-semibold mb-2'>Job Description</p>
          <div  ref={editorRef}>
          </div>
        </div>
        <div className='flex gap-4 '>
          <div className='w-full'>
            <p className='font-semibold'>Job Category</p>
            <select className='border-2 rounded-md border-gray-300' onChange={e=>setJobCategory(e.target.value)} value={jobCategory}>
              {JobCategories.map((category,idx)=>(
                <option key={idx} value={category} >{category}</option>
              ))}
            </select>
          </div>
          <div className='w-full'>
            <p className='font-semibold'>Job Location</p>
            <select onChange={e=>setJobLocation(e.target.value)} className='border-2 rounded-md border-gray-300'  value={jobLocation}>
              {JobLocations.map((location,idx)=>(
                <option key={idx} value={location} >{location}</option>
              ))}
            </select>
          </div>
          <div className='w-full'>
            <p className='font-semibold'>Job Level</p>
            <select className='border-2 rounded-md border-gray-300'  onChange={e=>setJobCategory(e.target.value)}>  
                <option value='Beginner Level' >Beginner Level'</option>
                <option value="Intermediate Level">Intermediate Level</option>
                <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        </div>
        <div>
          <p>Job Salary</p>
          <input type="Number" min={0} className='border-2 border-gray-300 rounded-md' onChange={e=>setSalary(e.target.value)} value={salary} />
        </div>
        <button className='px-5 py-1 border-1 bg-gray-800 text-white text-center rounded-md text-lg'>Add</button>
    </form>
  )
}

export default AddJobs
