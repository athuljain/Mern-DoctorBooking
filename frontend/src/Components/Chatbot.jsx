import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Style/Chat.css"

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the bottom when a new message arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      const aiMsg = { text: res.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { text: "Error: Could not reach the bot.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-window">
        {messages.map((c, i) => (
          <div key={i} className={`message-bubble ${c.sender}`}>
            <b>{c.sender === "user" ? "You" : "AI"}:</b> {c.text}
          </div>
        ))}
        {isLoading && <p className="loading">AI is thinking...</p>}
        <div ref={scrollRef} /> 
      </div>

      <div className="input-area">
        <input
          value={input} // Fixed variable name from 'message' to 'input'
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send on Enter key
          placeholder="Type message..."
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;