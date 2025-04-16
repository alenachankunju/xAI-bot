import React, { useState } from "react";
import Rating from "./Rating";

const FeedbackForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comments);
  };

  return (
    <div className="feedback-form-overlay">
      <div className="feedback-form">
        <h3>How was your conversation?</h3>

        <div className="rating-section">
          <label>Rating:</label>
          <Rating rating={rating} onRatingChange={setRating} />
        </div>

        <div className="comments-section">
          <label>Additional feedback:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
