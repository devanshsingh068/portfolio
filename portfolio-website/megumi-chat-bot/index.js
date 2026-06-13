import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import chatbotroutes from './routes/chatbot.routes.js'; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4002; 
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); 
app.use(express.json());

// Use the chatbot routes
app.use('/api/chatbot', chatbotroutes);

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to DB and listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error (Server not started):", err);
  });