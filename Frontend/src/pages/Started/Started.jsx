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
    <div className=' overflow-hidden  w-[450px] h-[500px] flex items-center justify-center p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    {/* <div className="container mx-auto p-4 h-screen flex items-center justify-center bg-gray-100"> */}
        
      <div className="  backdrop-filter backdrop-blur-lg">
    
        <div className="flex flex-col items-center">
          <img className="h-[150px] w-[200px] object-cover mb-4" src="LiveTalk.png" alt="App illustration" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome to LIVE TALK</h1>
          <p className="text-white-600 mb-6 text-center">
            Discover the features and benefits of our application. Whether you need to manage tasks, communicate with team
            members, or simply stay organized, our app has everything you need.
          </p>
          <div className="space-y-4 w-full">
            <button
              onClick={handleLoginClick}
              className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              onClick={handleSignUpClick}
              className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    
    </div>
  );
}