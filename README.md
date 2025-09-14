# EmotiAI - Emotion Detection Platform

A comprehensive AI-powered emotion detection application with facial recognition, text sentiment analysis, and intelligent conversation capabilities.

## Features

### 🎭 Emotion Detection
- **Facial Emotion Recognition**: Upload images for real-time facial emotion analysis using MediaPipe and CNN models
- **Text Sentiment Analysis**: Analyze text input for emotional content and sentiment classification
- **Multi-modal Analysis**: Support for both visual and textual emotion detection

### 💬 Conversation Engine
- **AI-Powered Chat**: Intelligent conversation system that adapts responses based on detected emotions
- **Tone Adaptation**: Dynamic conversation tone adjustment (empathetic, encouraging, calming, etc.)
- **Context Awareness**: Maintains conversation history and emotional context

### 📊 Analytics Dashboard
- **Real-time Analytics**: Live emotion detection statistics and trends
- **Conversation Metrics**: Session length, response accuracy, and user satisfaction tracking
- **Data Visualization**: Interactive charts and graphs using Recharts
- **Topic Analysis**: Identification of frequently discussed topics and sentiment patterns

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with custom design tokens
- **shadcn/ui** - High-quality UI components
- **Recharts** - Data visualization and charting

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **RESTful Architecture** - Clean API design
- **Mock AI Integration** - Simulated emotion detection and conversation AI

### Database (Ready for Integration)
- **PostgreSQL Schema** - Comprehensive database design
- **Analytics Tables** - Optimized for real-time analytics
- **User Management** - Authentication and user data storage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd emotiai-detection-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup (Optional)

If you want to set up a real database:

1. **Create a PostgreSQL database**
2. **Run the database schema**
   ```bash
   psql -d your_database -f scripts/create-database-schema.sql
   ```
3. **Update environment variables**
   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/your_database
   ```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── emotion/       # Emotion detection endpoints
│   │   ├── conversation/  # Chat API
│   │   └── analytics/     # Analytics API
│   ├── globals.css        # Global styles and design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── emotion-detection.tsx
│   ├── conversation-engine.tsx
│   ├── analytics-dashboard.tsx
│   └── sidebar.tsx
├── lib/                  # Utility functions
│   ├── utils.ts          # Common utilities
│   └── database.ts       # Database utilities
└── scripts/              # Database and setup scripts
    └── create-database-schema.sql
```


## API Endpoints

### Emotion Detection
- `POST /api/emotion/facial` - Analyze facial emotions from uploaded images
- `POST /api/emotion/text` - Analyze text sentiment and emotions

### Conversation
- `POST /api/conversation` - Generate AI responses based on detected emotions

### Analytics
- `GET /api/analytics` - Retrieve comprehensive analytics data

## Deployment

### Vercel (Recommended)
1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment with database
- **Heroku**: Traditional deployment option

## Real AI Integration

To integrate with real AI services, replace the mock implementations in the API routes:

### Facial Emotion Detection
- **MediaPipe** (Google) - Free, open source
- **OpenCV** - Computer vision library
- **HuggingFace Models** - Pre-trained CNN models on FER2013 dataset

### Text Sentiment Analysis
- **HuggingFace Transformers** - roberta-base-goemotions model
- **OpenAI API** - GPT models for advanced analysis
- **Google Cloud Natural Language** - Enterprise solution

### Conversation AI
- **Local Models**: Llama 2, Mistral, Falcon
- **APIs**: OpenAI GPT, Google Gemini, Anthropic Claude
- **HuggingFace Inference** - Free tier available

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **MediaPipe** for facial emotion detection capabilities
- **HuggingFace** for pre-trained sentiment analysis models
- **shadcn/ui** for beautiful UI components
- **Vercel** for hosting and deployment platform

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
