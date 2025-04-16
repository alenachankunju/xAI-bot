import React, { useState } from "react";
import Chat from "../components/Chat";

const ChatPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="chat-page">
      <div className="tabs">
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          Chat with Bot
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Past Conversations
        </button>
      </div>

      {activeTab === "chat" ? <Chat /> : <HistoryPage />}
    </div>
  );
};

export default ChatPage;
