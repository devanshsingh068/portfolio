import User from './user.model.js'; // Ensure this path is correct based on your file structure
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

// --- User Registration (Signup) ---
export const register = async (req, res) => {
  try {
    // Note: Frontend must send username, email, and password
    const { username, email, password } = req.body;

    // 1. Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide username, email, and password." });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ error: "Email already registered." });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ error: "Username is already taken." });
      }
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, 
    });

    await newUser.save();

    // 5. Success response (No need to return the password or token for registration)
    res.status(201).json({ 
      message: "Registration successful! You can now log in.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error during registration." });
  }
};

// --- User Login (Placeholder for now, but required by auth.routes.js) ---
export const login = (req, res) => {
    // Actual login logic will go here (comparing passwords, generating JWT)
    res.status(501).json({ error: "Login functionality not yet implemented. Please implement password checking and JWT generation." });
};