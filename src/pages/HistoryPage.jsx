import React from "react";
import ChatHistory from "../components/ChatHistory";
import FeedbackReview from "../components/FeedbackReview";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [view, setView] = useState("conversations");
  const navigate = useNavigate();

  return (
    <div className="history-page">
      <div className="history-header">
        <h2>Conversation History</h2>
        <div className="view-switcher">
          <button
            className={view === "conversations" ? "active" : ""}
            onClick={() => setView("conversations")}
          >
            Conversations
          </button>
          <button
            className={view === "feedback" ? "active" : ""}
            onClick={() => setView("feedback")}
          >
            Feedback Review
          </button>
        </div>
      </div>

      {view === "conversations" ? <ChatHistory /> : <FeedbackReview />}

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Chat
      </button>
    </div>
  );
};

export default HistoryPage;
