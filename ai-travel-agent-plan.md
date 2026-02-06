# AI Travel Agent App - Complete Development Plan

## Project Overview

**App Name:** AI Travel Companion  
**Description:** An intelligent travel agent application powered by Google Gemini LLM that helps users plan trips, search flights, book hotels, and get personalized travel recommendations.

**Core Tech Stack:**

- Frontend: Next.js 14 (App Router)
- Backend: Next.js API Routes
- Database: PostgreSQL with Prisma ORM
- AI: Google Gemini LLM
- Containerization: Docker & Docker Compose
- Authentication: NextAuth.js
- UI: Tailwind CSS + shadcn/ui

-----

## Phase 1: Project Setup & Infrastructure

### 1.1 Initialize Project Structure

```bash
# Create Next.js project
npx create-next-app@latest ai-travel-agent --typescript --tailwind --app

# Install core dependencies
npm install @prisma/client prisma
npm install @google/generative-ai
npm install next-auth
npm install zod
npm install axios
npm install date-fns
npm install lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

### 1.2 Docker Setup

**File: `docker-compose.yml`**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: travel_agent_db
    restart: always
    environment:
      POSTGRES_USER: travel_user
      POSTGRES_PASSWORD: travel_password_2024
      POSTGRES_DB: travel_agent_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: travel_agent_pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@travel.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

**File: `.env.local`**

```env
# Database
DATABASE_URL="postgresql://travel_user:travel_password_2024@localhost:5432/travel_agent_db"

# Google Gemini
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Flight & Hotel APIs
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_secret
BOOKING_COM_API_KEY=your_booking_api_key

# Optional: Other APIs
OPENWEATHER_API_KEY=your_weather_api_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_key
```

### 1.3 Prisma Setup

**File: `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  trips         Trip[]
  searches      SearchHistory[]
  preferences   UserPreference?
  bookings      Booking[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model UserPreference {
  id                String   @id @default(cuid())
  userId            String   @unique
  preferredCurrency String   @default("USD")
  preferredLanguage String   @default("en")
  seatPreference    String?
  mealPreference    String?
  budgetLevel       String   @default("moderate")
  travelStyle       String[] @default([])
  interests         String[] @default([])
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Trip {
  id          String   @id @default(cuid())
  userId      String
  title       String
  destination String
  startDate   DateTime
  endDate     DateTime
  budget      Float?
  status      String   @default("planning")
  description String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  itinerary   Itinerary[]
  bookings    Booking[]
  
  @@index([userId])
}

model Itinerary {
  id          String   @id @default(cuid())
  tripId      String
  day         Int
  activities  Json
  notes       String?  @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)
  
  @@index([tripId])
}

model Booking {
  id              String   @id @default(cuid())
  userId          String
  tripId          String?
  type            String
  bookingRef      String
  providerName    String
  providerData    Json
  totalPrice      Float
  currency        String
  status          String   @default("confirmed")
  bookedAt        DateTime @default(now())
  startDate       DateTime
  endDate         DateTime?
  
  user User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  trip Trip? @relation(fields: [tripId], references: [id], onDelete: SetNull)
  
  @@index([userId])
  @@index([tripId])
}

model SearchHistory {
  id          String   @id @default(cuid())
  userId      String
  searchType  String
  query       Json
  results     Json?
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model Conversation {
  id        String    @id @default(cuid())
  userId    String
  messages  Json[]
  metadata  Json?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  @@index([userId])
}
```

**Initialize Database:**

```bash
# Start Docker containers
docker-compose up -d

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database (optional)
npx prisma db seed
```

-----

## Phase 2: Core Backend Architecture

### 2.1 API Structure

**Directory Structure:**

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── ai/
│   │   │   ├── chat/route.ts
│   │   │   ├── recommendations/route.ts
│   │   │   └── itinerary/route.ts
│   │   ├── flights/
│   │   │   ├── search/route.ts
│   │   │   └── book/route.ts
│   │   ├── hotels/
│   │   │   ├── search/route.ts
│   │   │   └── book/route.ts
│   │   ├── trips/
│   │   │   └── [id]/route.ts
│   │   └── users/
│   │       └── preferences/route.ts
├── lib/
│   ├── prisma.ts
│   ├── gemini.ts
│   ├── amadeus.ts
│   ├── booking.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── components/
```

### 2.2 Gemini LLM Integration

**File: `src/lib/gemini.ts`**

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  async createItinerary(params: {
    destination: string;
    startDate: Date;
    endDate: Date;
    preferences: any;
  }) {
    const prompt = `Create a detailed day-by-day itinerary for ${params.destination}...`;
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  async chatWithAI(message: string, context: any) {
    const chat = this.model.startChat({
      history: context.history || [],
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  }

  async analyzeTravelImage(imageData: string) {
    const visionModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    const result = await visionModel.generateContent([
      'Identify this location and provide travel information',
      { inlineData: { data: imageData, mimeType: 'image/jpeg' } }
    ]);
    return result.response.text();
  }
}

export const geminiService = new GeminiService();
```

### 2.3 Flight API Integration (Amadeus)

**File: `src/lib/amadeus.ts`**

```typescript
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
```

### 2.4 Hotel API Integration (Booking.com)

**File: `src/lib/booking.ts`**

```typescript
import axios from 'axios';

export class BookingService {
  private baseURL = 'https://booking-com.p.rapidapi.com/v1';
  private headers = {
    'X-RapidAPI-Key': process.env.BOOKING_COM_API_KEY!,
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
  };

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
```

-----

## Phase 3: Frontend Development

### 3.1 Core Pages & Components

**Pages Structure:**

```
app/
├── page.tsx                    # Home/Dashboard
├── search/
│   ├── flights/page.tsx
│   ├── hotels/page.tsx
│   └── packages/page.tsx
├── trips/
│   ├── page.tsx               # My Trips List
│   └── [id]/page.tsx          # Trip Details
├── chat/page.tsx              # AI Chat Interface
├── bookings/page.tsx          # My Bookings
└── profile/page.tsx           # User Profile & Preferences
```

**Key Components:**

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Footer.tsx
├── search/
│   ├── FlightSearchForm.tsx
│   ├── HotelSearchForm.tsx
│   ├── FlightCard.tsx
│   └── HotelCard.tsx
├── ai/
│   ├── ChatInterface.tsx
│   ├── AIRecommendations.tsx
│   └── ItineraryGenerator.tsx
├── trips/
│   ├── TripCard.tsx
│   ├── ItineraryTimeline.tsx
│   └── TripMap.tsx
└── ui/
    └── (shadcn components)
```

### 3.2 Example Component: AI Chat Interface

**File: `src/components/ai/ChatInterface.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg p-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              {msg.role === 'assistant' && <Sparkles className="inline w-4 h-4 mr-2" />}
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything about your trip..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

-----

## Phase 4: API Routes Implementation

### 4.1 AI Chat Endpoint

**File: `src/app/api/ai/chat/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, history } = await request.json();

    const response = await geminiService.chatWithAI(message, { history });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

### 4.2 Flight Search Endpoint

**File: `src/app/api/flights/search/route.ts`**

```typescript
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
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
```

-----

## Phase 5: Advanced Features

### 5.1 AI-Powered Features to Implement

1. **Smart Itinerary Generator**
- Uses Gemini to create day-by-day plans
- Considers user preferences, budget, and interests
- Optimizes travel routes
1. **Price Prediction & Alerts**
- Track flight/hotel prices
- AI predicts best booking time
- Send notifications
1. **Natural Language Search**
- “Find me cheap flights to Tokyo in March”
- Convert to structured API queries
1. **Travel Assistant Chat**
- Answer travel questions
- Provide local recommendations
- Handle bookings via conversation
1. **Image Recognition**
- Upload travel photos
- AI identifies locations
- Suggests similar destinations

### 5.2 Real-time Features

**Implement with Socket.io or Server-Sent Events:**

- Live price updates
- Chat notifications
- Booking confirmations
- Trip collaboration

-----

## Phase 6: Testing & Deployment

### 6.1 Testing Strategy

```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

**Test Structure:**

```
__tests__/
├── unit/
│   ├── lib/gemini.test.ts
│   ├── lib/amadeus.test.ts
│   └── components/
├── integration/
│   └── api/
└── e2e/
    └── playwright/
```

### 6.2 Deployment

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Production docker-compose.yml:**

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
    depends_on:
      - postgres

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  postgres_data:
```

-----

## Phase 7: Development Timeline

### Week 1-2: Foundation

- ✅ Project setup
- ✅ Docker configuration
- ✅ Database schema design
- ✅ Basic authentication

### Week 3-4: Core Features

- ✅ Flight search integration
- ✅ Hotel search integration
- ✅ Gemini AI integration
- ✅ Basic UI components

### Week 5-6: Advanced Features

- ✅ AI chat interface
- ✅ Itinerary generator
- ✅ Trip management
- ✅ Booking system

### Week 7-8: Polish & Testing

- ✅ UI/UX refinement
- ✅ Testing implementation
- ✅ Performance optimization
- ✅ Bug fixes

### Week 9-10: Deployment

- ✅ Production setup
- ✅ Security hardening
- ✅ Monitoring setup
- ✅ Launch

-----

## Essential Commands Reference

```bash
# Development
npm run dev

# Docker
docker-compose up -d
docker-compose down
docker-compose logs -f

# Database
npx prisma migrate dev
npx prisma studio
npx prisma db push

# Build
npm run build
npm start

# Testing
npm test
npm run test:e2e
```

-----

## API Keys Required

1. **Google Gemini API** - https://makersuite.google.com/app/apikey
1. **Amadeus API** - https://developers.amadeus.com/
1. **Booking.com API** - https://rapidapi.com/apidojo/api/booking
1. **OpenWeather API** (Optional) - https://openweathermap.org/api
1. **Exchange Rate API** (Optional) - https://exchangerate-api.com/

-----

## Key Learnings & Best Practices

1. **Rate Limiting**: Implement rate limiting for external APIs
1. **Caching**: Use Redis for flight/hotel search results
1. **Error Handling**: Comprehensive error handling with fallbacks
1. **Security**: Validate all inputs, use parameterized queries
1. **Monitoring**: Implement logging (Winston/Pino) and monitoring (Sentry)
1. **AI Prompting**: Design effective prompts for Gemini
1. **Data Privacy**: Encrypt sensitive user data
1. **API Versioning**: Version your APIs from the start

-----

## Next Steps for Copilot Agents

This plan provides the complete blueprint. To begin implementation:

1. Start with Phase 1 (setup)
1. Implement database models
1. Create API integrations one at a time
1. Build UI components incrementally
1. Test each feature thoroughly
1. Deploy to staging environment

Focus on building an MVP first with core features: search, AI chat, and basic booking. Then iterate with advanced features.

Good luck building your AI travel agent! 🚀✈️
