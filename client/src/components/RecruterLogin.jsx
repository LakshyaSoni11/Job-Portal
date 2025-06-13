import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
const RecruterLogin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [state, setState] = useState('Login')
    const [image, setImage] = useState(false)
    const [submitData , setSubmitData] = useState(false)
    const {setRecruterLogin} = useContext(AppContext)
    const handleSubmit =(e) =>{
        e.preventDefault()
        if(state === 'Create' && !submitData){
            setSubmitData(true)
        }
    }
    //when the body mounts then overflow will be hidden and when unmounts then it'll be unset
    useEffect(()=>{
        document.body.style.overflow = 'hidden'
        return () =>{
            document.body.style.overflow = 'unset'
        }
    },[])

    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Recruiter {state}
                </h2>
                { state === 'Login' ? <p className="text-center text-gray-600">Welcome back! Login to continue</p>
                : <p className="text-center text-gray-600">Create an account!</p>
                }
                {state !== 'Login' && submitData ?
                <>
                    <div>
                        <label htmlFor="uploadImg">
                            <img className='w-15 h-15 rounded-full ' src={image? URL.createObjectURL(image) :    assets.upload_area} alt="" />
                            <input onChange={e=>{setImage(e.target.files[0])}} type="file" id="uploadImg" hidden />
                        </label>
                        <p>Upload company Logo</p>
                    </div>
                </>
                :
                <>
                {state !== 'Login' && (
                    <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                        <img src={assets.person_icon} alt="" className="w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm"
                        />
                    </div>
                )}
                <>
                {/* Email Field */}
                <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                    <img src={assets.email_icon} alt="" className="w-5 h-5 mr-3" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>

                {/* Password Field */}
                <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 focus-within:ring-2 ring-blue-300">
                    <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-3" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm" />
                </div>
                <p className='text-blue-700 text-sm cursor-pointer'>Forgot password ?</p>
                </>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                    {state === 'Login' ? 'Login' : (!submitData ? 'Create Account' : 'Next')}

                </button>
              { state === 'Login' ?   <p className='text-sm text-center text-gray-400'>Doesnt have an account ? <span onClick={e=>setState('Create')} className='text-blue-700 cursor-pointer '>Sign Up!</span> </p>            
                :<p className='text-sm text-center text-gray-400'>Already have an account ? <span onClick={e=>{setState('Login')}} className='text-blue-700 cursor-pointer '>Sign In!</span></p>
              }
                </>
}
                {/* Name Field */}
                <img src={assets.cross_icon} onClick={e=>{setRecruterLogin(false)}} className='absolute top-5 right-5' alt="" />
            </form>
        </div>

    )
}

export default RecruterLogin