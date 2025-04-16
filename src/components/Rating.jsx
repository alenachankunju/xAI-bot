import React from "react";

const Rating = ({ rating, onRatingChange }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : ""}`}
          onClick={() => onRatingChange(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default Rating;
