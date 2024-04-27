const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user already exists
    let existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new UserModel({
      email,
      username,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, username, password } = req.body;

    // Check if user exists
    let user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.email = email || user.email;
    user.username = username || user.username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user to database
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, getUserById, updateUserById, deleteUserById };
