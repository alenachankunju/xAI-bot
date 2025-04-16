import React, { useState } from "react";

const FeedbackReview = () => {
  const [filter, setFilter] = useState("all");
  const conversations = JSON.parse(
    localStorage.getItem("conversations") || "[]"
  );

  const filteredConversations = conversations.filter((conv) => {
    if (filter === "all") return true;
    return conv.rating === parseInt(filter);
  });

  return (
    <div className="feedback-review">
      <div className="filter-controls">
        <label>Filter by rating:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="feedback-list">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <div key={conv.id} className="feedback-item">
              <div className="feedback-rating">
                {"★".repeat(conv.rating)}
                {"☆".repeat(5 - conv.rating)}
              </div>
              <div className="feedback-comments">
                {conv.comments || "No comments provided"}
              </div>
              <div className="feedback-date">{conv.date}</div>
            </div>
          ))
        ) : (
          <p>No feedback matching the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackReview;
