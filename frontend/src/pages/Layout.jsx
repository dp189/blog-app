import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer} from '../index.jsx'

const Layout = () => {
  return (
    <div className="flex flex-col h-[100vh] bg-[#EAEADE] dark:bg-zinc-900 dark:text-white">
        
        <Header/>
        <div className="flex mx-auto px-5 md:px-5 bg-[#EAEADE] dark:bg-zinc-900 dark:text-white">
          <div className="mt-6 mb-6 min-h-[500px] w-full">
            <Outlet/>
          </div>
        </div>
        <Footer />
        
    </div>
  )
}

export default Layout