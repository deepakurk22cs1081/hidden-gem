
import React from 'react';
import { Location } from '../types';
import StarRating from './StarRating';
import { ArrowLeftIcon } from './icons';

interface LocationDetailViewProps {
  location: Location;
  onBack: () => void;
}

const LocationDetailView: React.FC<LocationDetailViewProps> = ({ location, onBack }) => {
  return (
    <div className="p-4">
      <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Discover
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img src={location.imageUrl} alt={location.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{location.name}</h2>
          <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{location.type} - <span className="text-green-600 dark:text-green-400">{location.budgetTag}</span></p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Ratings & Reviews</h3>
            {location.ratings.length > 0 ? location.ratings.map(rating => (
              <div key={rating.id} className="border-t border-gray-200 dark:border-gray-700 py-4">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-700 dark:text-gray-200">User {rating.userId}</p>
                  <div className="text-right">
                    <p className="text-sm">Food: <StarRating rating={rating.scores.food} className="inline-flex" /></p>
                    <p className="text-sm">Service: <StarRating rating={rating.scores.service} className="inline-flex" /></p>
                    <p className="text-sm">Ambiance: <StarRating rating={rating.scores.ambiance} className="inline-flex" /></p>
                  </div>
                </div>
                {rating.comment && <p className="mt-2 text-gray-600 dark:text-gray-300 italic">"{rating.comment}"</p>}
              </div>
            )) : <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailView;
