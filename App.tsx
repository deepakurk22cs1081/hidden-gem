
import React, { useState } from 'react';
import { MOCK_USER, MOCK_LOCATIONS } from './constants';
import Header from './components/Header';
import MapDiscoverView from './components/MapDiscoverView';
import LocationDetailView from './components/LocationDetailView';
import UserProfileView from './components/UserProfileView';
import SubmitLocationView from './components/SubmitLocationView';
import { PlusIcon } from './components/icons';
import VoiceAssistant from './components/VoiceAssistant';

type View = 'discover' | 'location-detail' | 'profile' | 'submit';

const App: React.FC = () => {
  const [view, setView] = useState<View>('discover');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const handleSelectLocation = (locationId: string) => {
    setSelectedLocationId(locationId);
    setView('location-detail');
  };

  const handleBack = () => {
    setView('discover');
    setSelectedLocationId(null);
  };
  
  const handleProfileClick = () => {
      setView('profile');
  }

  const handleProfileBack = () => {
      setView('discover');
  }

  const renderView = () => {
    switch (view) {
      case 'location-detail':
        const location = MOCK_LOCATIONS.find(l => l.id === selectedLocationId);
        return location ? <LocationDetailView location={location} onBack={handleBack} /> : <MapDiscoverView locations={MOCK_LOCATIONS} onSelectLocation={handleSelectLocation} />;
      case 'profile':
        return <UserProfileView user={MOCK_USER} onBack={handleProfileBack} />;
      case 'submit':
        return <SubmitLocationView onBack={handleBack} />;
      case 'discover':
      default:
        return <MapDiscoverView locations={MOCK_LOCATIONS} onSelectLocation={handleSelectLocation} />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Header user={MOCK_USER} onProfileClick={handleProfileClick} title="Hidden Gems" />
      <main className="container mx-auto pb-24">
        {renderView()}
      </main>
       {view === 'discover' && (
        <button
          onClick={() => setView('submit')}
          className="fixed bottom-24 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Submit new location"
        >
          <PlusIcon />
        </button>
      )}
      <VoiceAssistant />
    </div>
  );
};

export default App;
