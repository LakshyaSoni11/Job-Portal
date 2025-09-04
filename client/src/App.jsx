import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/home'
import Home from './pages/Home'
import ApplicationPage from './pages/ApplicationPage'
import ApplyPage from './pages/applyPage'
import RecruterLogin from './components/RecruterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJobs from './pages/addJobs'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/viewApplication'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const { recruterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {recruterLogin && <RecruterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applications' element={<ApplicationPage />} />
        <Route path='/apply-job/:id' element={<ApplyPage />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {/* nested routes */}
          {companyToken ? <>
            <Route path='add-jobs' element={<AddJobs />} />
            <Route path='manage-jobs' element={<ManageJobs />} />
            <Route path='viewApplication' element={<ViewApplication />} />
          </> : null

          }
        </Route>
      </Routes>
    </div>
  )
}

export default App