import React, { useState } from "react";

const ThumbsFeedback = ({ onThumbsUp, onThumbsDown, feedback }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`thumbs-feedback ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`thumbs-up ${feedback === "positive" ? "active" : ""}`}
        onClick={onThumbsUp}
        aria-label="Thumbs up"
      >
        👍
      </button>
      <button
        className={`thumbs-down ${feedback === "negative" ? "active" : ""}`}
        onClick={onThumbsDown}
        aria-label="Thumbs down"
      >
        👎
      </button>
    </div>
  );
};

export default ThumbsFeedback;
