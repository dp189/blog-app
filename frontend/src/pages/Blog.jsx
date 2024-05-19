import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/api";
import parse from "html-react-parser";

const Blog = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState({});

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
        console.log(newData);
        setBlog(newData);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="flex justify-center items-center text-justify md:p-4 ">
      {blog && (
        <div className="flex flex-col w-full sm:w-[80%] lg:w-[60%] overflow-hidden">
          <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            {blog.title}
          </h1>
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

// import React, { useState, useEffect  } from "react";
// import { useParams } from "react-router-dom";
// import { getBlogById } from "../api/api";
// import parse  from 'html-react-parser';

// const Blog = () => {

//   let {id} = useParams();
//   const [blog, setBlog] = useState({});

//   useEffect(() => {
//     async function fetchData(){
//       const blog = await getBlogById(id);

//       if(blog){
//         const date = new Date(blog.data.createdAt);
//         const formattedDate = date.toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric'
//       });
//       const newData = { ...blog.data, createdAt: formattedDate };
//       console.log(newData);
//       setBlog(newData);
//       }
//     }

//     fetchData();

//   }, [])

//   return (
//     <div className="flex  justify-center items-center text-justify ">
//       {blog && <div className="flex  flex-col w-[60%] overflow-hidden">
//         <h1 className=" mt-1 text-4xl font-extrabold">
//           {blog.title}
//         </h1>
//         <div className="flex mt-4 mb-4 dark:text-[#eae4e4]">
//           <small>{blog.createdAt}</small>
//         </div>

//         <div className="w-full h-[400px] shadow-md mb-3 rounded-lg " style={{backgroundImage: `url(${blog.image})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>

//         </div>

//         <div>
//           {typeof(blog.description) === "string" && parse(blog.description)}
//         </div>
//       </div>}
//     </div>
//   );
// };

// export default Blog;
