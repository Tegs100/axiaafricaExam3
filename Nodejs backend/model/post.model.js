const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      required: true, 
    },
    desc: {
      type: String, 
      required: true, 
    },
    previewPix: {
      type: String, 
      required: true,
    },
    previewVideo: {
      type: String, 
      required: true, 
    },
    detailedVideo: {
      type: String, 
      required: true, 
    },
    creator: {
      type: mongoose.Types.ObjectId, // Reference to User model
      required: true, // Field is mandatory
      ref: "User", // Reference to User model
    },
    
  },
  {
    timestamps: true, 
  }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
