import React, { useState } from 'react'; // MUST import useState
import axios from 'axios'; // MUST import axios

// Component name should be PascalCase
function BotChat() { 
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: "user" }]);
        setInput(""); 
        
        setLoading(true);
        
        // CRITICAL: Use correct backend port and route
        const backendURL = "http://localhost:4002/api/chatbot/message"; 
        
        try {
            const res = await axios.post(backendURL, {
                // Backend expects 'text' property
                text: userMessage 
            });

            if(res.status === 200){
                // Backend returns { reply: "..." }
                const botReply = res.data.reply; 
                
                setMessages(prevMessages => [...prevMessages, { text: botReply, sender: 'bot' }]);
            }
            
        } catch(error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Error connecting to the backend.", sender: 'bot' }]);
        } 
        
        setLoading(false);
    }
    
    return (
        // Minimal JSX to prevent crashes
        <div>
            {messages.map((msg, index) => (
                <div key={index}>
                    {msg.sender}: {msg.text}
                </div>
            ))}
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder={loading ? "Waiting for response..." : "Type a message"}
            />
            <button onClick={handleSendMessage} disabled={loading || !input.trim()}>Send</button>
        </div>
    );
}

export default BotChat;