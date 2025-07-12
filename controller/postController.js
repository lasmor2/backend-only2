const Post = require("../models/postModel");
const createPostSchema = require("../middlewares/createPostSchema");

const getController = async (req, res) => {
  const { page } = req.query;
  const postsPerPage = 10;

  try {
    let pageNum = 0;
    if (page <= 1) {
      pageNum = 0;
    } else {
      const result = await Post.find()
        .sort({ createdAt: -1 })
        .skip(pageNum * postsPerPage)
        .limit(postsPerPage)
        .populate({
          path: "userId",
          select: "email",
        });
      res.status(200).json({ success: true, message: "posts", data: result });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleController = async (req, res) => {
  const { _id } = req.query;

  try {
    const result = await Post.findOne({ _id }).populate({
      path: "userId",
      select: "email",
    });
    res.status(200).json({ success: true, message: "single post", data: result });
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;

  try {
    const { error } = createPostSchema.validate({
      title,
      description,
      userId,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newPost = await Post.create({
      title,
      description,
      userId,
    });
    const result = await newPost.save();
    res
      .status(201)
      .json({ success: true, message: "post created successfully", result });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getController, createPost, getSingleController };
