import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="container mx-auto mt-4">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Profile</h2>
          <div className="flex items-center space-x-4 mb-4">
            <img src={user.picture} alt={user.name} className="rounded-full w-20 h-20" />
            <div>
              <p className="text-gray-700"><strong className="font-medium">Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong className="font-medium">Email:</strong> {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;