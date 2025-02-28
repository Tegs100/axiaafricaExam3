const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    frontPix: {
      type: String,
      required: true
  },
   
    backPix: {
      type: String,
      required: true
    },

    country: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
      required: true
    },

   
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const kycModel = mongoose.model("KYC", kycSchema);
module.exports = kycModel;
