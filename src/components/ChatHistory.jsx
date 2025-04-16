import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatHistory = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const conversations = JSON.parse(localStorage.getItem("conversations") || []);
  const navigate = useNavigate();

  return (
    <div className="chat-history">
      <h3>Today's Chats</h3>

      {selectedConversation ? (
        <div className="conversation-detail">
          <button
            className="back-button"
            onClick={() => setSelectedConversation(null)}
          >
            Back to list
          </button>

          <div className="conversation-messages">
            {selectedConversation.messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-header">
                  <span className="sender">
                    {message.sender === "user" ? "You" : "Soul AI"}
                  </span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <p className="message-text">{message.text}</p>
                {message.sender === "ai" && message.feedback && (
                  <div className="feedback-indicator">
                    {message.feedback === "positive" ? "👍" : "👎"}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="conversation-feedback">
            <h4>Feedback</h4>
            <p>
              Rating: {"★".repeat(selectedConversation.rating)}
              {"☆".repeat(5 - selectedConversation.rating)}
            </p>
            {selectedConversation.comments && (
              <p>Comments: {selectedConversation.comments}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="conversations-list">
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className="conversation-item"
                onClick={() => setSelectedConversation(conv)}
              >
                <div className="conversation-preview">
                  <p>{conv.messages[0].text.substring(0, 50)}...</p>
                </div>
                <div className="conversation-meta">
                  <span>{conv.date}</span>
                  <span>
                    {"★".repeat(conv.rating)}
                    {"☆".repeat(5 - conv.rating)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No saved conversations yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
