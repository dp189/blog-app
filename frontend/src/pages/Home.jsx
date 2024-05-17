import React from 'react'
import {BlogCard} from '../index.jsx'
import { useEffect, useState } from 'react'
import { getBlogs, getBlogsByCategory } from '../api/api.js'
import { useSearchParams } from 'react-router-dom'

const Home = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams)
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   async function fetchData(){
  //     const allBlogs = await getBlogs();
  //     console.log(allBlogs);
  //     setBlogs(allBlogs.data)
  //   }

  //   fetchData();
  // }, [])

  useEffect(() => {
    async function fetchData(){
      

      if(searchParams.get('category') == null) {
        const allBlogs = await getBlogs();
        setBlogs(allBlogs.data);
      }
      else{      
        const allBlogs = await getBlogsByCategory(searchParams.get('category'));
        setBlogs(allBlogs.data)
      }
    }

    fetchData();
  },[searchParams])
  


  return (
    <div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 dark:bg-zinc-900">
        {blogs.map((data) => {
          return (<BlogCard data={data} key={data._id}/>)

        })}
        
      </div>
    </div>
  )
}

export default Home;