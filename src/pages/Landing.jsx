import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="container mx-auto mt-16 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to the To-Do List App!</h1>
      <p className="text-xl text-gray-700 mb-8">Organize your tasks and manage your time effectively.</p>
      <Link
        to="/home"
        className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Landing;