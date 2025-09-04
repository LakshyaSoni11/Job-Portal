import Quill from 'quill';
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('Bangalore');
  const [jobCategory, setJobCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner'); // Set a default value
  const [salary, setSalary] = useState(0);

  const { backendUrl, companyToken } = useContext(AppContext);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleFormSubmit = async (e) => { // Accept the event object
    e.preventDefault(); // Prevent page reload
    try {
      const description = quillRef.current.root.innerHTML;
      const {data} = await axios.post(backendUrl + "/api/company/post-job",
        {title: jobTitle, description,location: jobLocation, salary, level,category: jobCategory}, {headers: {token: companyToken}})
      if(data.success){
        toast.success(data.message)
        setJobTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML = "" 
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
      <div>
        <label className="block font-semibold mb-1">Job Title</label>
        <input
          type="text"
          onChange={(e) => setJobTitle(e.target.value)}
          value={jobTitle}
          className="w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Description</label>
        <div ref={editorRef} className="bg-white border rounded-md min-h-[150px]" />
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Category</label>
        <select
          onChange={(e) => setJobCategory(e.target.value)}
          value={jobCategory}
          className="w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1"
          required // Added required attribute
        >
          {JobCategories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Location</label>
        <select
          onChange={(e) => setJobLocation(e.target.value)}
          value={jobLocation}
          className="w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1"
          required // Added required attribute
        >
          {JobLocations.map((location, idx) => (
            <option key={idx} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Level</label>
        <select
          onChange={(e) => setLevel(e.target.value)}
          value={level}
          className="w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1"
          required // Added required attribute
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner Level</option>
          <option value="Intermediate">Intermediate Level</option>
          <option value="Senior">Senior Level</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Job Salary</label>
        <input
          type="number"
          onChange={(e) => setSalary(Number(e.target.value))}
          value={salary}
          className="w-full max-w-lg border-2 rounded-md border-gray-300 px-3 py-1"
        />
      </div>

      <button
        type="submit" // Changed button type to 'submit'
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Job
      </button>
    </form>
  );
};

export default AddJobs;