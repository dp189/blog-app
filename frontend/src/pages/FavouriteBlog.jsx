import React from 'react'
import {BlogCard} from '../index.jsx'
import { useFavouriteBlogContext } from '../hooks/useFavouriteBlogContext.js'

const FavouriteBlog = () => {
  
  const {favourites} = useFavouriteBlogContext();


  if(favourites.length === 0) {
    return <div className="text-black dark:text-white text-center text-3xl font-extrabold my-[50%]">No blogs found!!</div>
  }

  return (
    <>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 dark:bg-zinc-900">
        {favourites.map((data) => {
          return (<BlogCard data={data} key={data._id} isFavourite={true}/>)

        })}
        
      </div>
    </>
  )
}


export default FavouriteBlog