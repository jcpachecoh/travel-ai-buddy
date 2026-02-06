import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { z } from 'zod';

const recommendationSchema = z.object({
  destination: z.string().min(1),
  interests: z.array(z.string()),
  budget: z.string(),
  duration: z.number().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = recommendationSchema.parse(body);

    const recommendations = await geminiService.generateTravelRecommendations(params);

    return NextResponse.json({ recommendations });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('AI Recommendations Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
