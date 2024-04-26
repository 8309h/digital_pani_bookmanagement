const express = require('express');
const UserRouter = express.Router();
const { registerUser, loginUser, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');

// Register a new user
UserRouter.post('/register', registerUser);

// User login
UserRouter.post('/login', loginUser);

// Get user by ID
UserRouter.get('/:id', getUserById);

// Update user by ID
UserRouter.put('/:id', updateUserById);

// Delete user by ID
UserRouter.delete('/:id', deleteUserById);

module.exports = UserRouter;
