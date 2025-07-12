const express = require("express");
const identifier = require("../middlewares/identification");
const { getController } = require("../controller/postController");
const { getSingleController } = require("../controller/postController");
const { createPost } = require("../controller/postController");
const { updatePost } = require("../controller/postController");
const { deletePost } = require("../controller/postController");

const router = express.Router();

router.get("/allPosts", getController);
router.get("/singlePost", getSingleController);
router.post("/createPost", identifier, createPost);
router.put("/updatePost", identifier, updatePost);
router.delete("/deletePost", identifier, deletePost);

// router.put("/verifyCode", identifier, sendVerificationCode);
// router.delete("/verifyUser", identifier, verifyUser);

module.exports = router;
