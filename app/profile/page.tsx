'use client';

import { User, Settings, Globe, DollarSign } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile & Preferences</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Demo User</h2>
              <p className="text-gray-600 mb-4">demo@example.com</p>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Travel Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Currency Preference */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4" />
                  Preferred Currency
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>

              {/* Language Preference */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Globe className="w-4 h-4" />
                  Preferred Language
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              {/* Budget Level */}
              <div>
                <label className="block text-sm font-medium mb-2">Budget Level</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2">
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium mb-2">Travel Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Adventure', 'Relaxation', 'Culture', 'Food', 'Nature', 'City'].map((style) => (
                    <label key={style} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium mb-2">Interests</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  rows={3}
                  placeholder="Museums, hiking, local cuisine, photography..."
                />
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
