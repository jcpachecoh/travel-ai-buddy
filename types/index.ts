// User and Authentication Types
export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

// Trip Types
export interface Trip {
  id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget?: number;
  status: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Flight Types
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  travelClass?: string;
}

export interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Itinerary[];
}

export interface Itinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface FlightSegment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  duration: string;
}

// Hotel Types
export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
  currency?: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  price: {
    total: number;
    currency: string;
  };
  images: string[];
  amenities: string[];
}

// AI Chat Types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatHistory {
  messages: ChatMessage[];
  metadata?: Record<string, any>;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  tripId?: string;
  type: string;
  bookingRef: string;
  providerName: string;
  providerData: any;
  totalPrice: number;
  currency: string;
  status: string;
  bookedAt: Date;
  startDate: Date;
  endDate?: Date;
}

// User Preferences
export interface UserPreferences {
  preferredCurrency: string;
  preferredLanguage: string;
  seatPreference?: string;
  mealPreference?: string;
  budgetLevel: string;
  travelStyle: string[];
  interests: string[];
}
