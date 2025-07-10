const mongoose = required("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);

module.exports = Post;
