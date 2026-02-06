import { NextRequest, NextResponse } from 'next/server';
import { amadeusService } from '@/lib/amadeus';
import { z } from 'zod';

const searchSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  adults: z.number().min(1),
  children: z.number().optional(),
  travelClass: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = searchSchema.parse(body);

    const flights = await amadeusService.searchFlights(params);

    return NextResponse.json({ flights: flights.data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Flight Search Error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
