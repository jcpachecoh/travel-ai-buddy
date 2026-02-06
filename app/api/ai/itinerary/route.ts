import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { z } from 'zod';

const itinerarySchema = z.object({
  destination: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  preferences: z.any().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = itinerarySchema.parse(body);

    const itinerary = await geminiService.createItinerary({
      destination: params.destination,
      startDate: new Date(params.startDate),
      endDate: new Date(params.endDate),
      preferences: params.preferences || {},
    });

    return NextResponse.json({ itinerary });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('AI Itinerary Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
