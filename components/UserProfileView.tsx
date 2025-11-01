
import React from 'react';
import { User } from '../types';
import { ArrowLeftIcon, UserIcon } from './icons';

interface UserProfileViewProps {
  user: User;
  onBack: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onBack }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
       <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </button>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full mb-4" />
          ) : (
            <div className="w-24 h-24 rounded-full mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-gray-500" />
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.username}</h2>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{user.gamificationScore}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discovery Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
