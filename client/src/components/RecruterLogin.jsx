import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruterLogin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [state, setState] = useState('Login')
    const [image, setImage] = useState(false)
    const [submitData, setSubmitData] = useState(false)
    const navigate = useNavigate();
    const { setRecruterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // If Create state and no submitData yet, show image upload
        if (state === 'Create' && !submitData) {
            return setSubmitData(true)
        }
        
        try {
            if (state === "Login") {
                const { data } = await axios.post(backendUrl + "/api/company/login", { email, password })
                if (data.success) {
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token) // Fixed typo: was 'copanyToken'
                    setRecruterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message);
                }
            } else {
                // Registration case
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                if (image) {
                    formData.append('image', image)
                }

                const { data } = await axios.post(backendUrl + '/api/company/register', formData) // Added await
                if (data.success) {
                    console.log(data)
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token) // Fixed typo
                    setRecruterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    // Reset form when switching between login/register
    const handleStateChange = (newState) => {
        setState(newState)
        setSubmitData(false) // Reset submitData when changing state
        setName('')
        setEmail('')
        setPassword('')
        setImage(false)
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Recruiter {state}
                </h2>
                {state === 'Login' ? 
                    <p className="text-center text-gray-600">Welcome back! Login to continue</p>
                    : <p className="text-center text-gray-600">Create an account!</p>
                }

                {/* Conditional Content */}
                {state === 'Create' && submitData ? (
                    // Image Upload Section (Step 2 of registration)
                    <div className="text-center">
                        <label htmlFor="uploadImg" className="cursor-pointer">
                            <img 
                                className='w-20 h-20 rounded-full mx-auto object-cover border-2 border-dashed border-gray-300 hover:border-blue-500' 
                                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                                alt="Upload company logo" 
                            />
                            <input 
                                onChange={e => setImage(e.target.files[0])} 
                                type="file" 
                                id="uploadImg" 
                                accept="image/*"
                                hidden 
                            />
                        </label>
                        <p className="text-sm text-gray-600 mt-2">Upload company Logo</p>
                    </div>
                ) : (
                    // Form Fields Section
                    <>
                        {/* Company Name Field - Only for Create */}
                        {state === 'Create' && (
                            <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                                <img src={assets.person_icon} alt="Person icon" className="w-5 h-5 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm"
                                    required
                                    autoComplete="organization"
                                />
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                            <img src={assets.email_icon} alt="Email icon" className="w-5 h-5 mr-3" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm"
                                required
                                autoComplete="email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                            <img src={assets.lock_icon} alt="Lock icon" className="w-5 h-5 mr-3" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm"
                                required
                                autoComplete={state === 'Login' ? "current-password" : "new-password"}
                            />
                        </div>

                        {/* Forgot Password - Only for Login */}
                        {state === 'Login' && (
                            <p className='text-blue-700 text-sm cursor-pointer hover:underline'>
                                Forgot password?
                            </p>
                        )}
                    </>
                )}

                {/* Submit Button - Always visible */}
                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                    {state === 'Login' 
                        ? 'Login' 
                        : (submitData ? 'Complete Registration' : 'Create Account')
                    }
                </button>

                {/* Toggle between Login/Register */}
                {state === 'Login' ? (
                    <p className='text-sm text-center text-gray-400'>
                        Don't have an account? 
                        <span 
                            onClick={() => handleStateChange('Create')} 
                            className='text-blue-700 cursor-pointer hover:underline ml-1'
                        >
                            Sign Up!
                        </span> 
                    </p>            
                ) : (
                    <p className='text-sm text-center text-gray-400'>
                        Already have an account? 
                        <span 
                            onClick={() => handleStateChange('Login')} 
                            className='text-blue-700 cursor-pointer hover:underline ml-1'
                        >
                            Sign In!
                        </span>
                    </p>
                )}

                {/* Close Button */}
                <img 
                    src={assets.cross_icon} 
                    onClick={() => setRecruterLogin(false)} 
                    className='absolute top-5 right-5 cursor-pointer hover:opacity-70' 
                    alt="Close" 
                />
            </form>
        </div>
    )
}

export default RecruterLogin