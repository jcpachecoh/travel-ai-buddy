'use client';

import Link from 'next/link';
import { Plane, Hotel, MessageSquare, MapPin, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your AI-Powered Travel Companion
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Plan perfect trips with AI recommendations, search flights and hotels, 
            and get personalized itineraries tailored to your preferences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/chat" 
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Planning
            </Link>
            <Link 
              href="/search/flights" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Search Flights
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Your Journey</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/chat" className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Travel Assistant</h3>
              <p className="text-gray-600">Chat with our AI for personalized travel advice and recommendations</p>
            </Link>

            <Link href="/search/flights" className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flight Search</h3>
              <p className="text-gray-600">Find and compare the best flight deals for your destination</p>
            </Link>

            <Link href="/search/hotels" className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hotel className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hotel Booking</h3>
              <p className="text-gray-600">Discover and book the perfect accommodations</p>
            </Link>

            <Link href="/trips" className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trip Planning</h3>
              <p className="text-gray-600">Organize and manage all your trips in one place</p>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-center">Powered by AI</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">Get personalized travel suggestions based on your interests and budget</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Intelligent Itineraries</h3>
              <p className="text-gray-600">AI-generated day-by-day plans optimized for your trip duration</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">24/7 Travel Assistant</h3>
              <p className="text-gray-600">Ask questions anytime and get instant, helpful responses</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust AI Travel Companion for their journey planning
          </p>
          <Link 
            href="/chat" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
