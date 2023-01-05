import React from 'react'
import Navbar from '../Components/Navbar'
import SideBar from '../Components/SideBar'
import AllVideos from '../Components/AllVideos'

const Home = () => {
  return (
    <div className='h-screen bg-[#0f0f0f] flex flex-col'>
      <Navbar/>
      <div className="flex flex-1">
        <SideBar/>
        <AllVideos/>
      </div>
    </div>
  )
}

export default Home