
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

interface SubmitLocationViewProps {
  onBack: () => void;
}

const SubmitLocationView: React.FC<SubmitLocationViewProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Restaurant');
  const [budget, setBudget] = useState('Budget-friendly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit new location would go here
    alert(`Submitting ${name}... (not implemented)`);
    onBack();
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
       <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Discover
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Submit a New Spot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 dark:text-white"
          >
            <option>Restaurant</option>
            <option>Food Truck</option>
            <option>Small Shop</option>
            <option>Cafe</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Budget</label>
           <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800 dark:text-white"
          >
            <option>Budget-friendly</option>
            <option>Good value</option>
            <option>High-cost</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitLocationView;
