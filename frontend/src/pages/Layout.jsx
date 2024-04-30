import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer} from '../index.jsx'

const Layout = () => {
  return (
    <div className="min-h-[100vh] flex flex-col">
        {/* <div className="flex fixed bg-[#f0f8ff]"> */}
           <Header/>

        {/* </div> */}
        <div className="flex mx-auto px-5 md:px-20 ">
          <div className="mt-5 mb-5 min-h-[500px] w-full">
            <Outlet/>
          </div>
        </div>
        <Footer/>
        
    </div>
  )
}

export default Layout