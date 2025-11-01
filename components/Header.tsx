
import React from 'react';
import { UserIcon } from './icons';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onProfileClick: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ user, onProfileClick, title }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-gray-300 hidden sm:block">{user.username}</span>
        <button onClick={onProfileClick} className="focus:outline-none">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
