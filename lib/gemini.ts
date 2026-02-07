import { GoogleGenerativeAI } from '@google/generative-ai';

function getGenAI() {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set');
  }
  return new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
}

export class GeminiService {
  private model?: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;
  
  private getModel() {
    if (!this.model) {
      this.model = getGenAI().getGenerativeModel({ model: 'gemini-pro' });
    }
    return this.model;
  }

  async generateTravelRecommendations(params: {
    destination: string;
    interests: string[];
    budget: string;
    duration: number;
  }) {
    const prompt = `As a travel expert, provide detailed recommendations for ${params.destination}.
    
    User interests: ${params.interests.join(', ')}
    Budget level: ${params.budget}
    Trip duration: ${params.duration} days
    
    Provide:
    1. Top 5 must-visit attractions with reasons
    2. Daily itinerary suggestions
    3. Local food recommendations
    4. Budget breakdown
    5. Travel tips and cultural insights
    
    Format response as JSON.`;

    const result = await this.getModel().generateContent(prompt);
    return result.response.text();
  }

  async createItinerary(params: {
    destination: string;
    startDate: Date;
    endDate: Date;
    preferences: any;
  }) {
    const duration = Math.ceil(
      (params.endDate.getTime() - params.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const prompt = `Create a detailed day-by-day itinerary for ${params.destination}.
    
    Trip duration: ${duration} days
    Start date: ${params.startDate.toDateString()}
    End date: ${params.endDate.toDateString()}
    User preferences: ${JSON.stringify(params.preferences)}
    
    For each day, provide:
    - Morning activities
    - Afternoon activities
    - Evening activities
    - Recommended restaurants
    - Transportation tips
    - Estimated costs
    
    Format response as JSON array with one object per day.`;
    
    const result = await this.getModel().generateContent(prompt);
    return result.response.text();
  }

  async chatWithAI(message: string, context: any) {
    const chat = this.getModel().startChat({
      history: context.history || [],
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  }

  async analyzeTravelImage(imageData: string) {
    const visionModel = getGenAI().getGenerativeModel({ model: 'gemini-pro-vision' });
    const result = await visionModel.generateContent([
      'Identify this location and provide travel information',
      { inlineData: { data: imageData, mimeType: 'image/jpeg' } }
    ]);
    return result.response.text();
  }
}

export const geminiService = new GeminiService();
