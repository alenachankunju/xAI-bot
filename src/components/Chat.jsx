import React, { useState, useEffect, useRef } from "react";
import ThumbsFeedback from "./ThumbsFeedback";
import FeedbackForm from "./FeedbackForm";
import { sampleResponses } from "../data/sampleData";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(input),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        feedback: null,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setInput("");
  };

  const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("weather"))
      return "The weather is sunny and 75°F today.";
    if (lowerInput.includes("location"))
      return "I don't have access to your location for privacy reasons.";
    if (lowerInput.includes("temperature"))
      return "The current temperature is 75°F.";
    if (lowerInput.includes("how are you"))
      return "I'm just a computer program, but I'm functioning well!";
    return "Sorry, I did not understand your query!";
  };

  const handleThumbsFeedback = (messageId, isPositive) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: isPositive ? "positive" : "negative" }
          : msg
      )
    );
  };

  const handleSaveConversation = () => {
    setConversationEnded(true);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = (rating, comments) => {
    // Save conversation with feedback to local storage or API
    const conversation = {
      id: Date.now(),
      messages,
      rating,
      comments,
      date: new Date().toLocaleDateString(),
    };

    const savedConversations = JSON.parse(
      localStorage.getItem("conversations") || "[]"
    );
    localStorage.setItem(
      "conversations",
      JSON.stringify([...savedConversations, conversation])
    );

    setShowFeedbackForm(false);
    setMessages([]);
    setConversationEnded(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>How Can I Help You Today?</h2>
        <div className="suggestions">
          <p>Try asking:</p>
          <ul>
            <li>
              <p className="message-text">i, what is the weather</p>
            </li>
            <li>Hi, what is my location</li>
            <li>Hi, what is the temperature</li>
            <li>Hi, how are you</li>
          </ul>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-header">
              <span className="sender">
                {message.sender === "user" ? "You" : "Soul AI"}
              </span>
              <span className="timestamp">{message.timestamp}</span>
            </div>
            <p className="message-text">{message.text}</p>
            {message.sender === "ai" && (
              <ThumbsFeedback
                onThumbsUp={() => handleThumbsFeedback(message.id, true)}
                onThumbsDown={() => handleThumbsFeedback(message.id, false)}
                feedback={message.feedback}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showFeedbackForm && (
        <FeedbackForm
          onSubmit={handleFeedbackSubmit}
          onCancel={() => setShowFeedbackForm(false)}
        />
      )}

      <div className="input-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Bot AI..."
          />
          <button type="submit">Ask</button>
        </form>
        {messages.length > 0 && !conversationEnded && (
          <button
            type="button"
            className="save-button"
            onClick={handleSaveConversation}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Chat;
