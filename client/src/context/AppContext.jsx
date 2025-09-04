import { createContext, useEffect, useState } from "react";
// import React from "react";
// import { jobsData } from "../assets/assets";
import RecruterLogin from "../components/RecruterLogin";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = ''
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [searchedfilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    const { user } = useUser()
    const { getToken } = useAuth()
    const [isSearched, setIsSearched] = useState(false);
    const [jobs, setJobs] = useState([])
    const [recruterLogin, setRecruterLogin] = useState(false)
    //in order to integrate with the backend and get the following things from the backend DB
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])
    const fetchData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs')
            if (data.success) {
                // console.log("sata jobs are ", data.jobs)
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCompanyData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })
            if (data.success) {
                setCompanyData(data.company)
                // console.log(data)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    //function to fetch the user applications data
    const fetchUserData = async () => {
        try {
            const token = await getToken()
            // console.log('hit')
            const { data } = await axios.get(backendUrl + '/api/users/user',
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                setUserData(data.user)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserApplications = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/applications', { headers: { Authorization: `Bearer ${token}` } })
            console.log('hit')
            console.log("data is ", data)

            if (data.success) {
                setUserApplications(data.applications)
                // console.log("applications daa is", data)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
        searchedfilter, setSearchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        userData, setUserData,
        recruterLogin, setRecruterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userApplications, setUserApplications,
        fetchUserData, 
        getUserApplications
        
    };

    useEffect(() => {
        if (user) {
            fetchUserData()
            //fetch data whenever user logs in
            getUserApplications()
            
        }
    }, [user])
    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {
        fetchData()
        //store company token so that is doesnt get removed while refreshing the page
        const storedCompanyToken = localStorage.getItem('copanyToken')
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }
    }, [])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}