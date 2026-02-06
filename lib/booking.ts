import axios from 'axios';

export class BookingService {
  private baseURL = 'https://booking-com.p.rapidapi.com/v1';
  private headers: { 'X-RapidAPI-Key': string; 'X-RapidAPI-Host': string };

  constructor() {
    if (!process.env.BOOKING_COM_API_KEY) {
      throw new Error('BOOKING_COM_API_KEY environment variable must be set');
    }
    
    this.headers = {
      'X-RapidAPI-Key': process.env.BOOKING_COM_API_KEY,
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
    };
  }

  async searchHotels(params: {
    destination: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    rooms: number;
    currency?: string;
  }) {
    const response = await axios.get(`${this.baseURL}/hotels/search`, {
      headers: this.headers,
      params: {
        dest_type: 'city',
        dest_id: params.destination,
        checkin_date: params.checkIn,
        checkout_date: params.checkOut,
        adults_number: params.adults,
        room_number: params.rooms,
        currency: params.currency || 'USD',
        order_by: 'popularity',
      },
    });

    return response.data;
  }

  async getHotelDetails(hotelId: string) {
    const response = await axios.get(`${this.baseURL}/hotels/data`, {
      headers: this.headers,
      params: { hotel_id: hotelId },
    });

    return response.data;
  }
}

export const bookingService = new BookingService();
