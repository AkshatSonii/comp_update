const express = require("express");
const router = express.Router();
const { Blog } = require("../models.js");

// const editor = new EditorJS({
//   holder: "editor",
//   data: jsonData,
//   readOnly: true,
//   onChange: (data) => {
//     console.log(data);
//   },
//   onReady: (editor) => {
//     console.log(editor);
//   },
// });

router.get("/write", (req, res) => {
  res.render("writer", { user: req.user });
  //if (req.isAuthenticated()) {
  //  res.render("writer", { user: req.user });
  //} else {
  //  res.redirect("/login");
  //}
});



router.get("/read", async(req, res) => {
  const blogId = req.query.blogId;

  try{
    const found_blog = await Blog.findOne({_id : blogId});

    if(!found_blog){
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.render("read", {title : found_blog.title, content : found_blog.body});
  }

  catch(err){
    console.log(err);
    res.status(500).json({ message: 'Server error' })
  }
  
});



router.post("/write", (req, res) => {
  console.log(req.body);
});

module.exports = router;
