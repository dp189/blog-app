import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_BLOG;


const getBlogs = () => {

  
  return axios
    .get(API_URL + "/blogs")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getBlogsByCategory = (category) => {
  return axios
    .get(API_URL + "/blogs/categories/" + category)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const createBlogs = (formData) => {
  return axios
    .post(API_URL + "/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getBlogById = (id) => {
  return axios
    .get(API_URL + "/blogs/" + id)
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const addFavouriteBlogsToUser = (blogId, userData) => {
  console.log(API_URL_USER + "/users/favourites");
  return axios
    .post(
      API_URL_USER + "/users/favourites",
      {
        blogId: blogId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData}`,
        },
      }
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const getFavouriteBlogsByUser = (userData) => {
  return axios
    .get(API_URL_USER + "/users/favourites", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      console.log(err);
    });
};

const removeFavouriteBlogByUser = (blogId, userData) => {
  return axios
    .post(
      API_URL_USER + "/users/removeFavourites",
      {
        blogId: blogId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData}`,
        },
      }
    )
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      console.log(err);
    });
};

export {
  getBlogs,
  getBlogsByCategory,
  createBlogs,
  getBlogById,
  addFavouriteBlogsToUser,
  getFavouriteBlogsByUser,
  removeFavouriteBlogByUser
};
