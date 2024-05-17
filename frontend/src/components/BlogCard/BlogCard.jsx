import React from "react";
import { Link } from "react-router-dom";
import './BlogCard.css'

const BlogCard = ({ data }) => {
  return (
    <div className="dark:text-black dark:bg-[#edede9] bg-white shadow-lg overflow-hidden rounded-xl min-w-[300px] sm:min-w-[100px] md:min-w-[210px] max-w-[300px] hover:scale-110 hover:transition-all hover:duration-300 hover:ease-in">
      <Link to={`/blog/${data._id}`}>
        <div className="flex flex-col w-full ">
          {/* <img src={data.image}/> */}
          <div
            className="w-full h-[200px] "
            style={{
              width: "300px",
              backgroundImage: `url(${data.image})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <span className={ `tag tag-${data.category.toLowerCase()}`} >{data.category}</span>
          <div className="py-1 px-3 " >
            <h3 className="mt-1 text-xl text-left ">{data.title}</h3>
            {/* <div className="text-sm text-left opacity-70 truncate" style={{ fontStyle : 'normal', fontSize: '14px'}}>
              <p> {typeof data.description === "string" && parse(data.description)} </p>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
