// Import required dependencies
const userModel = require("../model/user.model"); // Import user database model
const bcrypt = require("bcryptjs"); // Import password hashing library
const jwt = require("jsonwebtoken"); // Import JWT for authentication tokens

// User Registration Controller Function
const createUser = async (req, res) => {
  // Destructure password from request body, keep other fields in 'others' object
  const { password, ...others } = req.body;

  // Generate a salt with 10 rounds of complexity for password hashing
  const salt = bcrypt.genSaltSync(10);

  // Hash the password with the generated salt
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword); // Log hashed password (should be removed in production)

  // Check if user already exists by searching for email
  const validateUser = await userModel.findOne({ email: others.email });
  console.log(validateUser); // Log user validation result (should be removed in production)

  // If user exists, return error response
  if (validateUser) {
    return res.status(400).json({ message: "Bad Request" });
  }

  // Attempt to create and save new user
  try {
    // Create new user instance with hashed password and other fields
    const newUser = new userModel({ password: hashedPassword, ...others });
    // Save user to database
    await newUser.save();
    // Return success response
    res.status(201).send("Created");
  } catch (error) {
    // Return error if user creation fails
    res.status(400).send("Bad Request: Cannot register user");
  }
};

// User Login Controller Function
const loginUser = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Bad Request:Invalid details" });
  }

  // Find user by email in database
  const checkUser = await userModel.findOne({ email });

  // If user not found, return error
  if (!checkUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare provided password with stored hashed password
  const checkPassword = bcrypt.compareSync(password, checkUser.password);

  // If password doesn't match, return error
  if (!checkPassword) {
    return res.status(404).json({ message: "Not Found: Invalid password" });
  }

  // Generate JWT token with user ID
  const token = jwt.sign({ id: checkUser.id }, process.env.JWT_SECRET);

  // Return success response with token in cookie and user data
  return res
    .cookie("token", token, { httpOnly: true }) // Set HTTP-only cookie with token
    .status(200) // Set success status
    .json(checkUser); // Send user data
};

// Get Single User Controller Function
const getOneUser = async (req, res) => {
  // Extract user ID from request parameters
  const user = req.user;

  try {
    // Find user by ID in database
    const oneUser = await userModel
    .findById(user)
    .populate({path: "kyc"})
    .populate ("posts");

    // If user not found, return error
    if (!oneUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json(oneUser);
  } catch (error) {
    // Return error if query fails
    res.status(404).json({ message: "Not Found: Cannot get user" });
  }
};

// Delete User Controller Function
const deleteUser = async (req, res) => {
  // Extract user ID from request body
  const user = req.user;

  try {
    // Find and delete user by ID
    await userModel.findByIdAndDelete(user);
    // Return success response
    res.status(200).send("Ok: User deleted successfully");
  } catch (error) {
    // Return error if deletion fails
    res.status(500).send("Server Error: Something went wrong");
  }
};



// Export all controller functions
module.exports = { createUser, loginUser, deleteUser, getOneUser };
