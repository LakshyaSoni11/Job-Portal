import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between px-7 pb-5 shadow-lg'>
        <img src={assets.logo} alt="logo" />
        <p>Copyright @ ALl rights reserved</p>
        <div className='flex items-center gap-2'>
    <img src={assets.instagram_icon} alt="" />
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer