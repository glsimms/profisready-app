import React, { useState, useEffect } from 'react';
import { Student } from './types';
import Header from './components/Header';
import StudentCheckIn from './components/StudentCheckIn';
import WaitingList from './components/WaitingList';
import { generateNotificationMessage } from './services/geminiService';

const PROFESSOR_NAME = "Professor Evans"; // Example professor name

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [notifyingStudentId, setNotifyingStudentId] = useState<number | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // Notification disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCheckIn = (name: string) => {
    const newStudent: Student = {
      id: Date.now(),
      name,
      checkInTime: new Date(),
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  };

  const handleNotify = async (studentToNotify: Student) => {
    setNotifyingStudentId(studentToNotify.id);
    try {
      const message = await generateNotificationMessage(PROFESSOR_NAME, studentToNotify.name);
      setNotification(message);
      setStudents(prevStudents => prevStudents.filter(s => s.id !== studentToNotify.id));
    } catch (error) {
      console.error("Failed to notify student:", error);
      setNotification(`An error occurred. Could not notify ${studentToNotify.name}.`);
    } finally {
      setNotifyingStudentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header professorName={PROFESSOR_NAME} />
      
      {notification && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white p-4 rounded-lg shadow-xl animate-fade-in-down z-50 max-w-sm">
          <p className="font-semibold">Notification Sent!</p>
          <p>{notification}</p>
        </div>
      )}

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <StudentCheckIn onCheckIn={handleCheckIn} />
          </div>
          <div className="lg:col-span-2">
            <WaitingList 
              students={students} 
              onNotify={handleNotify} 
              notifyingStudentId={notifyingStudentId}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;