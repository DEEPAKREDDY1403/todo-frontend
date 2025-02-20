import React from 'react';

function About() {
  return (
    <div className="container mx-auto mt-8 p-4 md:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">About This Project</h1>
      <p className="text-lg text-gray-700 mb-4">
        This is a simple To-Do List application built with React, Vite, and Auth0. It allows users to create, manage, and track their tasks.
      </p>
      <p className="text-lg text-gray-700 mb-2">Features include:</p>
      <ul className="list-disc list-inside text-lg text-gray-700 pl-5">
        <li>Task creation with priority, due date, and time.</li>
        <li>Task list display with completion status.</li>
        <li>Task completion management.</li>
        <li>User authentication with Auth0.</li>
      </ul>
    </div>
  );
}

export default About;