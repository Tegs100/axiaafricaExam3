const postModel = require("../model/post.model"); // Import post database model
const userModel = require("../model/user.model"); // Import user database model

const createPost = async (req, res) => {
  const user = req.user;
  const body = req.body;
  try {
    // Create new post document with request body and creator ID
    const post = new postModel({ ...body, creator: user });
    // Save post to database
    const savedPost = await post.save();
    // Update user document with new post ID
    const getUser = await userModel.findById(user)
    const userPostIds = getUser.post;
    userPostIds.push(savedPost.id);
    await userModel.findByIdAndUpdate(user,{posts: userPostIds, new: true});
    // Return success response
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    // Return error if post creation fails
    res.status(400).send({ message: "Bad Request: Something went wrong" });
  }
};

// Get all posts handler
const getAllPost = async (req, res) => {
  try {
    const allPost = await postModel
      .find()
      .select("title desc previewpix -_id") // Select only these fields from posts, exclude _id
      .populate({
        path: "creator", // Specify which field to populate with user data
        select: "name email -_id", // Select only these fields from user, exclude _id
      });

    res.json(allPost);
  } catch (error) {
    res.status(404).send({ message: "Not Found: Cannot get posts" });
  }
};

// Get single post handler
const getOnePost = async (req, res) => {
  // Get post ID from URL parameters
  const { id } = req.params;
  console.log({ id });
  try {
    // Find post by ID
    const onePost = await postModel
    .findById(id)
    .populate("creator");
    if(!onePost){
      return res.status(404).json({message: "Post not found"})
    }
    // Return the post
    res.json(onePost);
  } catch (error) {
    // Return error if post not found
    res.status(404).json({ message: "Not Found: Cannot get post" });
  }
};

// Update post handler
const updatePost = async (req, res) => {
  // Get post ID from URL parameters
  const { id } = req.params;
  // Get authenticated user ID
  const user = req.user;
  // Destructure request body, removing id field
  const { id: postId, ...others } = req.body;
  try {
    // Find post to update
    const updatedPost = await postModel.findById(id);
    // Check if post exists
    if (!updatedPost) {
      return res.json({ message: "post does not exist" });
    }
    // Verify user owns the post
    if (updatedPost.creator != user) {
      return res.json({ message: "you are not the owner of the post" });
    }
    // Update post with new data
    await postModel.findByIdAndUpdate(id, { ...others }, { new: true });
    // Return success response
    res.status(200).json({ message: "post updated successfully" });
  } catch (error) {
    // Return error if update fails
    res.status(400).json({ message: "Cannot update post" });
  }
};

// Delete post handler
const deletePost = async (req, res) => {
  // Get post ID from URL parameters
  const { id } = req.params;
  // Get authenticated user ID
  const user = req.user;
  try {
    // Find post to delete
    const deletedPost = await postModel.findById(id);
    // Check if post exists
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Verify user owns the post
    if (deletedPost.creator.toString() != user) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not permitted to delete this post" });
    }
    // Add the actual deletion
    await postModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Ok: Post deleted successfully" });
  } catch (error) {
    // Return error if deletion fails
    res.status(400).json({ message: "Cannot delete post" });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
};
