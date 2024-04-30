import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { createBlogs } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";

const CreateBlog = () => {
  const navigateTo = useNavigate();
  const categoryList = [
    { text: "Nature" },
    { text: "Travel" },
    { text: "Technology" },
    { text: "Finance" },
  ];

  const blankBlog = {
    title: "",
    image: null,
    category: "",
    description: "<p><br></p>",
  };

  const [newBlog, setNewBlog] = useState(blankBlog);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {

      setLoading(true);
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("category", newBlog.category);
      formData.append("description", newBlog.description);
      formData.append("image", newBlog.image);

      // Make a POST request using Axios
      const response = await createBlogs(formData);

      if (response.data) {
        
        setNewBlog(blankBlog);
        setLoading(false);
        toast.success("Blog created successfully.");
      }
      setTimeout(() => {
        navigateTo("/");
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex w-full  items-center justify-center mt-6">
        <div className="bg-slate-300  p-5 rounded-xl">
          <h1 className="text-3xl mb-5">Create Blog Post</h1>
          <div className="flex flex-col">
            <label htmlFor="" className="text-gray-600 ml-1 font-semibold font-sans">
              Title
            </label>
            <input
              type="text"
              value={newBlog.title}
              onChange={(e) => {
                setNewBlog({ ...newBlog, title: e.target.value });
              }}
              className="border border-gray-300 h-10 my-2 p-2 rounded"
            />
            <label htmlFor="" className="text-gray-600 ml-1 font-semibold font-sans">
              Category
            </label>
            <select
              value={newBlog.category}
              onChange={(e) => {
                setNewBlog({ ...newBlog, category: e.target.value });
              }}
              name="category"
              id="category"
              className="border border-gray-300 h-10 my-2 p-2 rounded"
            >
              <option value="" default disabled>
                Select Category
              </option>
              {categoryList.map((category, index) => {
                return (
                  <option value={category.text} key={index}>
                    {category.text}
                  </option>
                );
              })}
            </select>
            <label htmlFor="" className="text-gray-600 ml-1 font-semibold font-sans">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => {
                setNewBlog({ ...newBlog, image: e.target.files[0] });
              }}
              className="my-2 p-1"
            />
            <label htmlFor="" className="text-gray-600 ml-1 font-semibold  font-sans">
              Post
            </label>

            <ReactQuill
              className="bg-white mt-2 rounded editingarea "
              theme="snow"
              value={newBlog.description}
              onChange={(e) => {
                setNewBlog({ ...newBlog, description: e });
              }}
            />

            <br />

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSubmit()}
                className="bg-slate-500 text-white h-8 w-[100px] rounded"
              >
                Save
              </button>
              <MoonLoader
                color="#1d2d44"
                size={20}
                loading={loading}
                speedMultiplier={1}
              />
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
