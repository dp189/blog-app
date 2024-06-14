import React from 'react'
import {BlogCard} from '../index.jsx'
import { useEffect, useState } from 'react'
import { getBlogs, getBlogsByCategory } from '../api/api.js'
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading.jsx'

const Home = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setloading] = useState(false);

  

  useEffect(() => {
    async function fetchData(){
      setloading(true);
      if(searchParams.get('category') == null) {
        const allBlogs = await getBlogs();
        
        setBlogs(allBlogs.data);
      }
      else{      
        const allBlogs = await getBlogsByCategory(searchParams.get('category'));
        setBlogs(allBlogs.data)
      }
      setloading(false);
    }

    fetchData();
  },[searchParams])
  


  if(blogs.length === 0) {
    return <div className="text-black dark:text-white text-center text-3xl font-extrabold my-[50%]">No blogs found!!</div>
  }

  return (
    <div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 dark:bg-zinc-900">

        { blogs.map((data) => {
          return (<BlogCard data={data} key={data._id}/>)

        })}
        
      </div>
      {loading? <Loading/> : <></>}
    </div>
  )
}

export default Home;