'use client';

import { Plane, Hotel, CheckCircle, Clock } from 'lucide-react';

export default function BookingsPage() {
  // Mock bookings data
  const bookings = [
    {
      id: '1',
      type: 'flight',
      bookingRef: 'FL-2024-001',
      providerName: 'Amadeus',
      status: 'confirmed',
      totalPrice: 450,
      currency: 'USD',
      startDate: '2024-06-15',
      description: 'JFK → LAX',
    },
    {
      id: '2',
      type: 'hotel',
      bookingRef: 'HT-2024-001',
      providerName: 'Booking.com',
      status: 'confirmed',
      totalPrice: 850,
      currency: 'USD',
      startDate: '2024-06-15',
      endDate: '2024-06-20',
      description: 'Grand Hotel Los Angeles',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-gray-600 mb-6">Your flight and hotel bookings will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-lg ${
                    booking.type === 'flight' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {booking.type === 'flight' ? (
                      <Plane className={`w-6 h-6 ${
                        booking.type === 'flight' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    ) : (
                      <Hotel className={`w-6 h-6 ${
                        booking.type === 'flight' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{booking.description}</h3>
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-gray-600">
                      <p><strong>Booking Reference:</strong> {booking.bookingRef}</p>
                      <p><strong>Provider:</strong> {booking.providerName}</p>
                      <p>
                        <strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()}
                        {booking.endDate && ` - ${new Date(booking.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ${booking.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">{booking.currency}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex gap-2">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Download Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
