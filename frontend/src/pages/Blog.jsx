import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addFavouriteBlogsToUser, getBlogById } from "../api/api";
import parse from "html-react-parser";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";

const Blog = () => {
  let { id } = useParams();

  const [blog, setBlog] = useState({});
  const [isFavourited, setIsFavourited] = useState(false);

  const {user} = useAuthContext();


  
  useEffect(() => {
    async function fetchData() {
      const blog = await getBlogById(id);
      
      if (blog) {
        const date = new Date(blog.data.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const newData = { ...blog.data, createdAt: formattedDate };
        // console.log(newData);
        setBlog(newData);
      }
    }

    fetchData();
  }, [id]);

  const handleFavouriteBlog = async () => {
    setIsFavourited(prev =>!prev); 
    const favBlog = await addFavouriteBlogsToUser(id, user.user.accessToken);
    console.log(favBlog);
  }


  const handleRemoveFavouriteBlog = () => {
    setIsFavourited(prev =>!prev);
    console.log(isFavourited);
  }


  return (
    <div className="flex justify-center items-center text-justify md:p-4 ">
      {blog && (
        <div className="flex flex-col w-full sm:w-[80%] lg:w-[60%] overflow-hidden">
          <div className="flex justify-between">
          <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold inline-block w-[70%]">
            {blog.title}
          </h1>
          {!isFavourited && <BsBookmarkPlus className="text-2xl text-end mt-3 md:mt-5 cursor-pointer" onClick={handleFavouriteBlog}/>}
          {isFavourited && <BsFillBookmarkCheckFill className="text-2xl text-end mt-3 md:mt-5 cursor-pointer text-[#9b2226] dark:text-[#edede9]" onClick={handleRemoveFavouriteBlog}/>}
          </div>
          <div className="flex mt-2 sm:mt-4 mb-2 sm:mb-4 dark:text-[#eae4e4]">
            <small>{blog.createdAt}</small>
          </div>
          <div
            className="w-full h-64 lg:h-[350px] shadow-md mb-3 rounded-lg "
            style={{
              backgroundImage: `url(${blog.image})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: 'cover',
              
            }}
          ></div>
          <div className="text-left">
            {typeof blog.description === "string" && parse(blog.description)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
