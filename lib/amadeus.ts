import axios from 'axios';

export class AmadeusService {
  private baseURL = 'https://test.api.amadeus.com/v2';
  private accessToken: string | null = null;

  async authenticate() {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    this.accessToken = response.data.access_token;
  }

  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    travelClass?: string;
  }) {
    if (!this.accessToken) await this.authenticate();

    const response = await axios.get(`${this.baseURL}/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params: {
        originLocationCode: params.origin,
        destinationLocationCode: params.destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults,
        children: params.children,
        travelClass: params.travelClass || 'ECONOMY',
        max: 50,
      },
    });

    return response.data;
  }

  async getFlightPrice(flightOfferId: string) {
    if (!this.accessToken) await this.authenticate();

    const response = await axios.post(
      `${this.baseURL}/shopping/flight-offers/pricing`,
      { data: { type: 'flight-offers-pricing', flightOffers: [flightOfferId] } },
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );

    return response.data;
  }
}

export const amadeusService = new AmadeusService();
