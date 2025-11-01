
import React from 'react';
import { Location } from '../types';
import LocationCard from './LocationCard';
import SuggestionWidget from './SuggestionWidget';

interface MapDiscoverViewProps {
  locations: Location[];
  onSelectLocation: (locationId: string) => void;
}

const MapDiscoverView: React.FC<MapDiscoverViewProps> = ({ locations, onSelectLocation }) => {
  return (
    <div className="p-4">
      <SuggestionWidget />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} onSelect={onSelectLocation} />
        ))}
      </div>
    </div>
  );
};

export default MapDiscoverView;
