# Convo.ai

> Chat with your PDF documents using AI-powered RAG (Retrieval-Augmented Generation).

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)

## Features

- **PDF Upload & Processing** — Upload PDFs and extract text automatically
- **AI Chat** — Ask questions and get instant, accurate answers
- **RAG Technology** — Answers grounded in your actual document content
- **Vector Search** — Semantic search through document chunks
- **Modern UI** — Clean, responsive SaaS-style interface
- **Authentication** — Secure login with Google, GitHub, or email

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **AI:** OpenAI API (GPT-3.5/4, Embeddings)
- **Database:** SQLite (development) / PostgreSQL (production)
- **Vector Store:** In-memory (dev) / Pinecone (production)
- **Auth:** NextAuth.js v5

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- (Optional) Pinecone account for vector storage

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/convo-ai.git
cd convo-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Set up database
npx prisma db push
npx prisma generate

# Run development server
npm run dev
```

### Environment Variables

```env
# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Database
DATABASE_URL="file:./dev.db"
```

## Project Structure

```
convo-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── chat/
│   │   │   │   └── route.ts
│   │   │   └── upload/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── [fileId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── landing/
│   │   │   ├── CTA.tsx
│   │   │   ├── DemoPreview.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Steps.tsx
│   │   └── ui/
│   │       ├── Avatar.tsx
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ChatInput.tsx
│   │       ├── ChatMessage.tsx
│   │       ├── FileUpload.tsx
│   │       └── Input.tsx
│   └── lib/
│       ├── auth.ts
│       ├── db.ts
│       ├── openai.ts
│       ├── pdf.ts
│       ├── pinecone.ts
│       ├── utils.ts
│       └── vectorstore.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handlers |
| GET | `/api/upload` | List user PDFs |
| POST | `/api/upload` | Upload and process PDF |
| GET | `/api/chat?pdfId=xxx` | Get chat messages |
| POST | `/api/chat` | Send message and get AI response |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built by **Vaibhav Singh** — Full Stack + AI Developer

[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername) | [Email](mailto:your-email@gmail.com)
