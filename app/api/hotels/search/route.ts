import { NextRequest, NextResponse } from 'next/server';
import { bookingService } from '@/lib/booking';
import { z } from 'zod';

const searchSchema = z.object({
  destination: z.string().min(1),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number().min(1),
  rooms: z.number().min(1),
  currency: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = searchSchema.parse(body);

    const hotels = await bookingService.searchHotels(params);

    return NextResponse.json({ hotels: hotels.data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Hotel Search Error:', error);
    return NextResponse.json(
      { error: 'Failed to search hotels' },
      { status: 500 }
    );
  }
}
