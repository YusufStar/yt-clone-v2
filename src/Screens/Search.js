import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Search = () => {
  const { id } = useParams()

  return (
    <div className='h-screen bg-[#0f0f0f] flex flex-col'>
      <Navbar defaultSearchText={id}/>
    </div>
  )
}

export default Search