import React from 'react';
import BotChat from './BotChat.jsx'; // Note: Ensure the file is named BotChat.jsx, or adjust import if it is still named bot.jsx

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4">React Chatbot</h1>
      <BotChat />
    </div>
  )
}

export default App;