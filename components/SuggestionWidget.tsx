
import React, { useState, useEffect } from 'react';
import { generateFoodSuggestion } from '../services/geminiService';
import { LightbulbIcon } from './icons';

const SuggestionWidget: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestion = async () => {
      setLoading(true);
      const newSuggestion = await generateFoodSuggestion();
      setSuggestion(newSuggestion);
      setLoading(false);
    };

    fetchSuggestion();
  }, []);

  return (
    <div className="bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 rounded-md shadow-sm my-4 flex items-start">
      <LightbulbIcon className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="font-bold">Feeling peckish?</p>
        <p>
          {loading ? 'Thinking of something delicious...' : suggestion}
        </p>
      </div>
    </div>
  );
};

export default SuggestionWidget;
