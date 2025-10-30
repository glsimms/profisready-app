import React from 'react';

interface HeaderProps {
    professorName: string;
}

const Header: React.FC<HeaderProps> = ({ professorName }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Office Hours Queue</h1>
            <p className="text-md text-gray-500">{professorName}'s Office</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Live Waitlist</span>
        </div>
      </div>
    </header>
  );
};

export default Header;