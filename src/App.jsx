import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import Home from './pages/Home';
import About from './pages/About';
import Landing from './pages/Landing';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import './index.css';

function App() {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto py-8 flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;