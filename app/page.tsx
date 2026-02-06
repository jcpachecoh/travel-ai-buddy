'use client';

import { useState } from 'react';

export default function Home() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">✈️</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Travel AI Buddy
              </h1>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Your AI Travel Planner
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Plan Your Perfect Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Let our AI help you create personalized travel itineraries based on your preferences, 
            budget, and interests.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Tell us about your trip
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="destination" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Where do you want to go?
                </label>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Paris, Tokyo, New York"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="duration" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  How long is your trip?
                </label>
                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 5 days, 1 week"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="budget" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  What&apos;s your budget?
                </label>
                <select
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="budget">Budget ($)</option>
                  <option value="moderate">Moderate ($$)</option>
                  <option value="luxury">Luxury ($$$)</option>
                </select>
              </div>

              <div>
                <label 
                  htmlFor="interests" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  What are your interests?
                </label>
                <textarea
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., culture, food, adventure, relaxation, history"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Generate Travel Plan ✨
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your AI-Powered Itinerary
            </h3>
            
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill out the form to get your personalized travel recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    📍 Destination: {destination}
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    Duration: {duration} | Budget: {budget}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Day 1: Arrival & Exploration
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Check into hotel, explore local area, visit main attractions
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Day 2: Cultural Experience
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visit museums, historical sites, and local markets
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Day 3: Adventure & Activities
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based on your interests: {interests}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                    💡 AI Recommendations
                  </h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-1">
                    <li>• Best time to visit: Spring or Fall</li>
                    <li>• Must-try local cuisine spots</li>
                    <li>• Off-the-beaten-path attractions</li>
                    <li>• Budget-friendly transportation tips</li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowResults(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Plan Another Trip
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smart recommendations based on your preferences
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Personalized
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tailored itineraries matching your interests
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Instant Results
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get your travel plan in seconds
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>Travel AI Buddy - Making travel planning effortless with AI</p>
        </div>
      </footer>
    </div>
  );
}
