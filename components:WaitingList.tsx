import React from 'react';
import { Student } from '../types';

// This is defined here to be used by the WaitingList component.
const StudentRow: React.FC<{
  student: Student;
  index: number;
  onNotify: (student: Student) => void;
  isNotifying: boolean;
}> = ({ student, index, onNotify, isNotifying }) => {
  return (
    <li className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <span className="text-sm font-bold text-gray-500 w-8">{index + 1}.</span>
        <div>
          <p className="text-md font-medium text-gray-900">{student.name}</p>
          <p className="text-sm text-gray-500">
            Checked in at {student.checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
      <button
        onClick={() => onNotify(student)}
        disabled={isNotifying}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {isNotifying ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
           </svg>
        )}
        {isNotifying ? 'Notifying...' : 'Notify Student'}
      </button>
    </li>
  );
};


interface WaitingListProps {
  students: Student[];
  onNotify: (student: Student) => void;
  notifyingStudentId: number | null;
}

const WaitingList: React.FC<WaitingListProps> = ({ students, onNotify, notifyingStudentId }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Waiting List ({students.length})</h2>
      <div className="overflow-x-auto">
        {students.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <StudentRow
                key={student.id}
                student={student}
                index={index}
                onNotify={onNotify}
                isNotifying={notifyingStudentId === student.id}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students waiting</h3>
            <p className="mt-1 text-sm text-gray-500">The waiting list is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingList;