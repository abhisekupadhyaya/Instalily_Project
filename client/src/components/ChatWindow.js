/* global chrome */
import React, { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";
import { getAIMessage, updateWebpage } from "../api/api";
import { marked } from "marked";

function ChatWindow() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hi, how can I help you today?"
  }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleMessage = (message) => {
      if (message.action === "updateHTML") {
        processUpdateHTML(message);
      }
    };
  
    chrome.runtime.onMessage.addListener(handleMessage);
  
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  
  const processUpdateHTML = async (message) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(message.html, 'text/html');
    const title = doc.title || 'Untitled Page';
    const url = message.url || 'Unknown URL';
    const parsedContent = message.html;
  
    setMessages(prevMessages => [
      ...prevMessages,
      {
        role: "assistant",
        content: `I can see current page: "${title}". Looking at it.....`
      }
    ]);
  
    try {
      const response = await updateWebpage("1234", url, title, parsedContent);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: "assistant",
          content: `How can I assist you with "${title}"?`
        }
      ]);
    } catch (error) {
      console.error('Error updating webpage:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error processing the webpage. How can I assist you?"
        }
      ]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() !== "") {
      const userMessage = { role: "user", content: input };
      const waitingMessage = { role: "assistant", content: "Waiting for expert response..." };
      
      setMessages(prevMessages => [...prevMessages, userMessage, waitingMessage]);
      setInput("");
  
      try {
        const newMessage = await getAIMessage(input);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg === waitingMessage ? newMessage : msg
          )
        );
      } catch (error) {
        console.error("Error getting AI message:", error);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg === waitingMessage ? { role: "assistant", content: "Sorry, an error occurred. Please try again." } : msg
          )
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;