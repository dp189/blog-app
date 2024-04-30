import React, { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/api";
import parse  from 'html-react-parser';

const Blog = () => {

  let {id} = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    async function fetchData(){
      const blog = await getBlogById(id);
      
      if(blog){
        const date = new Date(blog.data.createdAt);
        const formattedDate = date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
      });
      const newData = { ...blog.data, createdAt: formattedDate };
      console.log(newData);
      setBlog(newData);
      }
    }

    fetchData();
    
    
  }, [])
    
  return (
    <div className="flex justify-center items-center text-justify">
      {blog && <div className="flex flex-col w-[60%] overflow-hidden">
        <h1 className=" mt-1 text-4xl font-extrabold">
          {blog.title}
        </h1>
        <div className="flex mt-4 mb-4">
          <small>{blog.createdAt}</small>
        </div>

        <div className="w-full h-[400px] shadow-md mb-3 rounded-lg " style={{backgroundImage: `url(${blog.image})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>

        </div>
        {/* <img
          className="w-full h-[400px] object-cover mb-3 rounded-lg"
          src={blog.image}
        /> */}

        <div>
          {typeof(blog.description) === "string" && parse(blog.description)}
        </div>
      </div>}
    </div>
  );
};

export default Blog;
