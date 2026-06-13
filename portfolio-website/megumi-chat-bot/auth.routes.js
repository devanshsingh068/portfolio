// routes/auth.routes.js
import express from 'express';
// Import the controller functions (register and login) from the auth.controller.js file
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

// Route for user registration (Signup)
// POST request to /api/auth/register will call the register function
router.post('/register', register);

// Route for user login
// POST request to /api/auth/login will call the login function
router.post('/login', login);

export default router;