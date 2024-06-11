import React from 'react'
import {BlogCard} from '../index.jsx'
import { useEffect, useState } from 'react'
import { getFavouriteBlogsByUser } from '../api/api.js'

import { useAuthContext } from '../hooks/useAuthContext.js'

const FavouriteBlog = () => {


  
  const [blogs, setBlogs] = useState([]);
  const {user} = useAuthContext();
  

  useEffect(() => {
    async function fetchData(){
    
      const favBlogs = await getFavouriteBlogsByUser(user.user.accessToken);
      
      setBlogs(favBlogs.data);
      
    }

    fetchData();
  },[])
  


  return (
    <>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 dark:bg-zinc-900">
        {blogs.map((data) => {
          return (<BlogCard data={data} key={data._id}/>)

        })}
        
      </div>
    </>
  )
}


export default FavouriteBlog