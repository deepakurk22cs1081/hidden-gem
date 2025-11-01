
import React from 'react';
import { StarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            className="w-5 h-5 text-yellow-400"
            filled={starValue <= rating}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
