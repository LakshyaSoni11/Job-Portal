import { createContext, useEffect, useState } from "react";
import React from "react";
import { jobsData } from "../assets/assets";
import RecruterLogin from "../components/RecruterLogin";
export const AppContext = createContext();

export const AppContextProvider = (props) =>{
    const [searchedfilter , setSearchFilter] = useState({
        title:'',
        location: ''
    })
    const [isSearched , setIsSearched] = useState(false);
    const [jobs , setJobs] = useState([])
    const [recruterLogin,setRecruterLogin] = useState(false)
    const value ={
        searchedfilter,setSearchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        recruterLogin , setRecruterLogin,
    }
    const fetchData =() =>{
        setJobs(jobsData)
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}