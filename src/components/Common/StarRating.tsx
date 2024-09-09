import React from "react";
import { Star, StarHalf } from "lucide-react"; // Import icons from Lucide

// StarRating Component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Full star
      stars.push(
        <Star key={i} fill="#FFD700" stroke="#FFD700" height={12} width={12} />,
      );
    } else if (i - rating < 1) {
      // Half star
      stars.push(
        <StarHalf
          key={i}
          fill="#FFD700"
          stroke="#FFD700"
          height={12}
          width={12}
        />,
      );
    } else {
      // Empty star
      stars.push(<Star key={i} stroke="#E0E0E0" height={12} width={12} />);
    }
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default StarRating;
