'use client';

import Link from 'next/link';
import { Plane, MessageSquare, Hotel, MapPin, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Plane className="w-8 h-8" />
            <span className="text-2xl font-bold">AI Travel Companion</span>
          </Link>
          
          <nav className="flex gap-6">
            <Link href="/search/flights" className="flex items-center gap-2 hover:text-blue-200">
              <Plane className="w-5 h-5" />
              <span>Flights</span>
            </Link>
            <Link href="/search/hotels" className="flex items-center gap-2 hover:text-blue-200">
              <Hotel className="w-5 h-5" />
              <span>Hotels</span>
            </Link>
            <Link href="/trips" className="flex items-center gap-2 hover:text-blue-200">
              <MapPin className="w-5 h-5" />
              <span>My Trips</span>
            </Link>
            <Link href="/chat" className="flex items-center gap-2 hover:text-blue-200">
              <MessageSquare className="w-5 h-5" />
              <span>AI Chat</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-2 hover:text-blue-200">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
