# AI Travel Companion ✈️🤖

An intelligent travel agent application powered by Google Gemini LLM that helps users plan trips, search flights, book hotels, and get personalized travel recommendations.

## 🌟 Features

- 🤖 **AI-Powered Travel Assistant**: Chat with AI for travel advice and recommendations
- ✈️ **Flight Search**: Search and compare flights using Amadeus API
- 🏨 **Hotel Search**: Find the best hotels using Booking.com API
- 🗺️ **Smart Itinerary Generator**: AI-generated day-by-day travel plans
- 💼 **Trip Management**: Organize and track your trips
- 🎯 **Personalized Recommendations**: Tailored suggestions based on preferences
- 📊 **User Preferences**: Save your travel style, interests, and budget
- 💾 **Booking History**: Track all your travel bookings in one place

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini LLM
- **APIs**: Amadeus (Flights), Booking.com (Hotels)
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS + Lucide Icons
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 20.x or higher
- Docker and Docker Compose
- PostgreSQL (via Docker or local installation)
- API Keys:
  - Google Gemini API Key
  - Amadeus API Key and Secret
  - Booking.com API Key (via RapidAPI)

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd travel-ai-buddy
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your API keys and credentials:

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
```

4. **Start Docker containers**

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- pgAdmin on port 5050

5. **Generate Prisma Client**

```bash
npx prisma generate
```

6. **Run database migrations**

```bash
npx prisma migrate dev --name init
```

7. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
travel-ai-buddy/
├── app/
│   ├── api/                    # API Routes
│   │   ├── ai/                 # AI-related endpoints
│   │   │   ├── chat/          # AI chat endpoint
│   │   │   ├── recommendations/
│   │   │   └── itinerary/
│   │   ├── flights/           # Flight search endpoints
│   │   ├── hotels/            # Hotel search endpoints
│   │   └── trips/             # Trip management endpoints
│   ├── chat/                  # AI Chat page
│   ├── search/                # Search pages
│   │   ├── flights/
│   │   └── hotels/
│   ├── trips/                 # Trip management pages
│   └── layout.tsx             # Root layout
├── components/
│   ├── ai/                    # AI-related components
│   │   └── ChatInterface.tsx
│   ├── search/                # Search components
│   │   ├── FlightSearchForm.tsx
│   │   └── HotelSearchForm.tsx
│   └── layout/                # Layout components
│       └── Header.tsx
├── lib/
│   ├── prisma.ts             # Prisma client
│   ├── gemini.ts             # Google Gemini service
│   ├── amadeus.ts            # Amadeus API service
│   ├── booking.ts            # Booking.com service
│   └── utils.ts              # Utility functions
├── prisma/
│   └── schema.prisma         # Database schema
├── types/
│   └── index.ts              # TypeScript types
├── docker-compose.yml        # Docker configuration
└── Dockerfile                # Production Docker image
```

## 🔑 API Keys Setup

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` as `GOOGLE_GEMINI_API_KEY`

### Amadeus API
1. Visit [Amadeus Developers](https://developers.amadeus.com/)
2. Create a free account
3. Get your API Key and Secret
4. Add to `.env` as `AMADEUS_API_KEY` and `AMADEUS_API_SECRET`

### Booking.com API
1. Visit [RapidAPI Booking.com](https://rapidapi.com/apidojo/api/booking)
2. Subscribe to the API
3. Get your API key
4. Add to `.env` as `BOOKING_COM_API_KEY`

## 🎯 Usage

### AI Chat
Navigate to `/chat` to interact with the AI travel assistant for recommendations and advice.

### Flight Search
Navigate to `/search/flights` to search for flights between airports.

### Hotel Search
Navigate to `/search/hotels` to find hotels in your destination.

### Trip Management
Navigate to `/trips` to view and manage your trips.

## 🗄️ Database Management

**Access pgAdmin:**
- URL: http://localhost:5050
- Email: admin@travel.com
- Password: admin

**Run Prisma Studio:**
```bash
npx prisma studio
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Build Docker image
docker build -t travel-ai-buddy .

# Run Docker container
docker run -p 3000:3000 travel-ai-buddy
```

## 🧪 Development Commands

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the GitHub repository.
