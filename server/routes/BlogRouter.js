const express = require("express");
const {
  addBlogs,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/createblog", addBlogs);
router.get("/getallblog", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/updateblog/:id", updateBlog);
router.delete("/deleteblog/:id", deleteBlog);

module.exports = router;
