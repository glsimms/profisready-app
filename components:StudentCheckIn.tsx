import React, { useState } from 'react';

interface StudentCheckInProps {
  onCheckIn: (name: string) => void;
}

const StudentCheckIn: React.FC<StudentCheckInProps> = ({ onCheckIn }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCheckIn(name.trim());
      setName('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Student Check-in</h2>
      <p className="text-gray-500 mb-6">Arrived for your appointment? Please enter your name below to join the queue.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="student-name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Jane Doe"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Check In
        </button>
      </form>
    </div>
  );
};

export default StudentCheckIn;