import React from 'react'
import './Navbar.css'
import myImage from '/myimage.jpg'

const Navbar = () => {
  return (
    <nav id='nav'>
      <div className='w-[100%]] h-[200px] flex justify-center items-center relative'>
        <div className='w-[80vw] lg:w-[60vw] h-[110px] sm:h-[150px] overflow-hidden border-none'>
        <img className='w-[80vw] lg:w-[60vw] h-[110px] sm:h-[150px] object-cover blur-[2px] overflow-hidden border-none rounded-sm' src={myImage} alt="" />
        </div>
        <h1 id='myTask' className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white text-4xl lg:text-6xl font-bold'>My Task</h1>
      </div>
    </nav>
  )
}

export default Navbar
