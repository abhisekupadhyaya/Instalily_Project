import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage } from "../api/api";
import { marked } from "marked";

function ChatWindow() {

  const defaultMessage = [{
    role: "assistant",
    content: "Hi, how can I help you today?"
  }];

  const [messages,setMessages] = useState(defaultMessage)
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const handleSend = async (input) => {
    if (input.trim() !== "") {
      // Set user message
      setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
      setInput("");
  
      // Add a temporary "waiting" message
      const waitingMessage = { role: "assistant", content: "Waiting for expert response..." };
      setMessages(prevMessages => [...prevMessages, waitingMessage]);
  
      try {
        // Call API to get AI message
        const newMessage = await getAIMessage(input);
  
        // Replace the waiting message with the actual AI response
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg === waitingMessage ? newMessage : msg
          )
        );
      } catch (error) {
        // Handle error if getAIMessage fails
        console.error("Error getting AI message:", error);
        
        // Replace the waiting message with an error message
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg === waitingMessage ? { role: "assistant", content: "Sorry, an error occurred. Please try again." } : msg
          )
        );
      }
    }
  };

  return (
      <div className="messages-container">
          {messages.map((message, index) => (
              <div key={index} className={`${message.role}-message-container`}>
                  {message.content && (
                      <div className={`message ${message.role}-message`}>
                          <div dangerouslySetInnerHTML={{__html: marked(message.content).replace(/<p>|<\/p>/g, "")}}></div>
                      </div>
                  )}
              </div>
          ))}
          <div ref={messagesEndRef} />
          <div className="input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend(input);
                  e.preventDefault();
                }
              }}
              rows="3"
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
      </div>
);
}

export default ChatWindow;
