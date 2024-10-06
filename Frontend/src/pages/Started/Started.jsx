import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Started() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-6'>
      <div className='w-full max-w-md p-8 rounded-lg shadow-lg bg-white bg-opacity-80 backdrop-blur-lg'>
        <div className="flex flex-col items-center">
          <img className="h-32 w-auto object-cover mb-4" src="LiveTalk.png" alt="App illustration" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Welcome to LIVE TALK</h1>
          <p className="text-gray-600 mb-6 text-center">
            Discover the features and benefits of our application. Whether you need to manage tasks, communicate with team
            members, or simply stay organized, our app has everything you need.
          </p>
          <div className="space-y-4 w-full">
            <button
              onClick={handleLoginClick}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
            >
              Login
            </button>
            <button
              onClick={handleSignUpClick}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
