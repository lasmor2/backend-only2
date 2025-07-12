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
    const existingPost = await Post.findOne({ _id }).populate({
      path: "userId",
      select: "email",
    });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "single post", data: existingPost });
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

const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;
  const { _id } = req.query;

  try {
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    if (existingPost.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "you are not authorized" });
    }
    existingPost.title = title;
    existingPost.description = description;
    const result = await existingPost.save();
    res
      .status(200)
      .json({ success: true, message: "post updated successfully", result });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const { userId } = req.user;
  const { _id } = req.query;

  try {
    const existingPost = await Post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "post not found" });
    }
    if (existingPost.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "you are not authorized" });
    }
    await existingPost.deleteOne({ _id });
    res
      .status(200)
      .json({ success: true, message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getController,
  createPost,
  getSingleController,
  updatePost,
  deletePost,
};
