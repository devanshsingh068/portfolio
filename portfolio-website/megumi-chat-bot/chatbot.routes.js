// chatbot.routes.js
import express from 'express';
import { message } from '../controllers/chatbotmessage.js';

const router = express.Router();

// Define your POST route with the handler function
router.post('/message', message);

// Export router as default export so it can be imported correctly
export default router;