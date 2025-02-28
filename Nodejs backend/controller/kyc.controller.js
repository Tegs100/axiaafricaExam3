const kycModel = require("../model/kyc.model");
const userModel = require("../model/user.model");

const createKyc = async (req, res) => {
  const body = req.body;
  const user = req.user;
  try {
    
    // Create new KYC instance by spreading request body and adding user reference
    const kyc = new kycModel({ ...body, user });
    const savedKyc = await kyc.save();
    
    await userModel.findByIdAndUpdate(
      user,
      { kyc: savedKyc.id },
      { new: true }
    );
    res.status(201).json({
      message: "Kyc created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: " Server Error",
      error: error.message,
    });
  }
};

//Get one kyc controller function
const getOneKyc = async (req, res) => {
  const {id} = req.params;
  
    try {
      // Find user by ID in database
      const oneKyc = await kycModel.findById(id).populate("user", "name email");
  
      // If user not found, return error
      if (!oneKyc) {
        return res.status(404).json({ message: "Kyc not found" });
      }
  
      // Return user's data
      res.status(200).json(oneKyc);
    } catch (error) {
      // Return error if query fails
      res.status(404).json({ message: "Not Found: Cannot get kyc" });
    };

};
// Export the createKyc function to be used in other files
module.exports = {
  createKyc, getOneKyc
};
