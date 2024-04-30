import { Router } from "express";
import {
  createBlog,
  findAllBlogs,
  findAllBlogsByCategory,
  findBlogsById,
  deleteBlogById,
  updateBlogById
} from "../controller/blogs.controller.js";
import { upload } from "../middleware/blog.middlewares.js";

const router = Router();

//routes configuration
router
  .route("/")
  .get(findAllBlogs)
  .post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    createBlog
  );

router.route("/categories/:category").get(
  findAllBlogsByCategory
)

router
  .route("/:blogId")
  .get(findBlogsById)
  .delete(deleteBlogById)
  .patch(upload.single("image"), updateBlogById);

export default router;
