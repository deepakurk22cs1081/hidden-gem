
import React from 'react';
import { Location } from '../types';
import StarRating from './StarRating';

interface LocationCardProps {
  location: Location;
  onSelect: (locationId: string) => void;
}

const calculateAverageRating = (ratings: Location['ratings']) => {
    if (!ratings || ratings.length === 0) return 0;
    const totalScore = ratings.reduce((acc, rating) => {
        const { food, service, ambiance, discovery } = rating.scores;
        return acc + (food + service + ambiance + discovery) / 4;
    }, 0);
    return Math.round(totalScore / ratings.length);
};


const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  const avgRating = calculateAverageRating(location.ratings);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onSelect(location.id)}
    >
      <img src={location.imageUrl} alt={location.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{location.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location.type}</p>
        <div className="mt-2 flex justify-between items-center">
          <StarRating rating={avgRating} />
          <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">{location.budgetTag}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
