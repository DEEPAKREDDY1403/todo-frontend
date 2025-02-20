import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Navigation() {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="bg-indigo-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-2xl font-bold text-gray-800" to="/">
          To-Do List App
        </Link>
        <div className="flex space-x-4 items-center">
          <Link className="text-indigo-600 hover:text-indigo-800" to="/home">
            Home
          </Link>
          <Link className="text-indigo-600 hover:text-indigo-800" to="/about">
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link className="text-indigo-600 hover:text-indigo-800" to="/profile">
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;