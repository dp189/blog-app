import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
    <div id='error-text' className='flex flex-col items-center text-black dark:text-white text-[40px] font-extrabold'>
        <img className='lg:h-[300px] md:absolute' src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
        <span className='text-[1.3em] md:text-[3.3em] md:relative md:mt-[280px]'>PAGE 404</span>
        <p className="text-[15px] text-center md:text-[19px]">
           The page you were looking for could not be found.</p>
           <Link to={"/"} className=''>
        <p className="text-[15px]">
            Back to previous page ...
        </p>
        </Link>
    </div>
    </div>
  )
}

export default NotFound