const express=require("express");
const { addCategory, addSubCategory, allCategory } = require("../controllers/addCategory");
const router=express.Router();

router.post("/addcategory",addCategory);
router.post("/addsubcategory", addSubCategory);
router.get("/allcategory", allCategory)

module.exports=router