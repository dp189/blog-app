import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { createBlogs } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { useAuthContext} from "../hooks/useAuthContext.js"
import { Navigate } from "react-router-dom";

const CreateBlog = () => {
  const navigateTo = useNavigate();
  const categoryList = [
    { text: "Nature" },
    { text: "Travel" },
    { text: "Technology" },
    { text: "Finance" },
    { text: "Health"},
    { text: "Business"}
  ];

  const blankBlog = {
    title: "",
    image: null,
    category: "",
    description: "<p><br></p>",
  };

  const [newBlog, setNewBlog] = useState(blankBlog);
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuthContext();

  
  

  useEffect(() => {
    // Check if all fields are filled
    const isValid =
      newBlog.title.trim() !== "" &&
      newBlog.category.trim() !== "" &&
      newBlog.image !== null &&
      newBlog.description.trim() !== "<p><br></p>";

    setIsFormValid(isValid);
  }, [newBlog]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust the width as needed for "large devices"
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("category", newBlog.category);
      formData.append("description", newBlog.description);
      formData.append("image", newBlog.image);

      const response = await createBlogs(formData);
      if (response.data) {
        setNewBlog(blankBlog);
        setLoading(false);
        toast.success("Blog created successfully.");
        setTimeout(() => {
          navigateTo("/");
        }, 4000);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };


  if( !user ){
    return (
      <Navigate to='/login'/>
    )
  }

  return (
    <>
      

      {isMobile ? (
        <div className="flex justify-center items-center ">
          <p className="text-center text-lg p-5 bg-red-200 rounded-lg shadow-lg text-red-600">
            This page is not optimized for small devices like mobiles. Please open on a larger device.
          </p>
        </div>
      ) : 
      (
        <>
        {user && user.user.role !== 'admin'? <div className="flex justify-center items-center ">
          <p className="text-center text-lg p-5 bg-red-200 rounded-lg shadow-lg text-red-600">
            You don't have permission to create blogs. Contact <b><a href="mailto:debabratapal4a@gmail.com">Admin</a></b> for permission.
          </p>
        </div> : <></>}
        <div  className="dark:text-black flex justify-center mt-16 px-4 w-full">
          <div className="bg-slate-300 w-full max-w-6xl p-5 rounded-lg shadow">
            <h1 className="text-3xl mb-5 text-center">Create Blog Post</h1>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="border border-gray-300 p-3 rounded"
              />
              <select
                value={newBlog.category}
                onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                className="border border-gray-300 p-3 rounded"
              >
                <option value="" disabled>Select Category</option>
                {categoryList.map((category, index) => (
                  <option value={category.text} key={index}>
                    {category.text}
                  </option>
                ))}
              </select>
              <input
                type="file"
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
                className="p-2"
              />
              <div className="container h-auto ">
                <ReactQuill
                  theme="snow"
                  placeholder="Create an epic......"
                  value={newBlog.description}
                  onChange={(content) => setNewBlog({ ...newBlog, description: content })}
                  className="bg-white rounded "
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#4E7771] text-white py-2 rounded disabled:bg-[#7da9a1]"
                disabled={!isFormValid || loading || user.user.role !== 'admin'}
                
              >
                Save
              </button>
              {loading && (
                <div className="flex justify-center items-center mt-2">
                  <MoonLoader color="#1d2d44" size={20} loading={loading} />
                </div>
              )}
            </form>
          </div>
        </div>
        </>
      ) 

    }
    
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CreateBlog;
