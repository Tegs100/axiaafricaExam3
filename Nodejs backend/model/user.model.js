// Import Mongoose ODM for MongoDB interaction
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// Define User Schema with specific field requirements
const userSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String, // Name must be a string
      required: true, // Field is mandatory
      validate: {
        validator: async function(value) {
          console.log(value);
          return value.length >= 10;
        },
        message: "Please nmae should be atleast ten characters"
      },
    },
    Lastname: {
      type: String, // Name must be a string
      required: true, // Field is mandatory
      validate: {
        validator: async function(value) {
          console.log(value);
          return value.length >= 10;
        },
        message: "Please nmae should be atleast ten characters"
      },
    },
    username: {
      type: String, // Username must be a string
      required: true, // Field is mandatory
      unique: true, // Must be unique across all users
      validate: {
        validator: async function(value) {
          console.log(value);
          return value.length >= 10;
        },
        message: "Please nmae should be atleast ten characters"
      }
    },
    email: {
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
    },
    password: {
      type: String, 
      required: true, 
    },
    age: {
      type: Number, 
      required: true,
      min: 18,
      max: 60,
    },
    gender: {
      type: String, 
      enum: ["male", "female"]
    },
    kyc: { 
      type: mongoose.Types.ObjectId, 
      ref: "KYC",
    },
    post: [ 
      {
        type: mongoose.Types.ObjectId,
        ref: "Post", 
      }],
  },
 {
    timestamps: true, 
  }
);

userSchema.pre("save", async function(next) {
    const hashedpassword = bycrpt.hashSync(this.password, 10);
    this.password = hashedpassword;
    next();
  })
userSchema.post("save", async function (doc, next) {
    console.log("After saved documents");
    console.log(doc);
next();

});

// Delete users kyc and all posts when user is deleted
userSchema.post("findOneAndDelete", async function(doc, next) {
console.log(doc.kyc)
//Delete kyc document
const kycModel = mongoose.model("KYC");
await kycModel.findByIdAndDelete(doc.kyc)
console.log ("Kyc created successfully")
// Delete post document
const postModel = mongoose.model("Post")
await postModel.deleteMany(doc.post);
console.log("Post deleted successfully")

next();
});

  

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
