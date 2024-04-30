import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL



 const getBlogs = () => {

    
    return  axios.get(API_URL+'/blogs')
    .then(function (response) {
      
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    })
}

const getBlogsByCategory = (category) => {
  return axios.get(API_URL + '/blogs/categories/' + category) 
    .then(function(response){
      console.log(response.data);
      return response.data
    }).catch(function (err){
      console.log(err);
    })
}


 const createBlogs = (formData) => {
  return axios.post(API_URL + '/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
    },
  }).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.log(error);
  })
}

const getBlogById = (id) => {
  console.log(API_URL+'/blogs/' + id);
  return axios.get(API_URL + '/blogs/' + id) 
    .then(function(response){
      return response.data
    }).catch(function (err){
      console.log(err);
    })
}

export { getBlogs, getBlogsByCategory, createBlogs, getBlogById};