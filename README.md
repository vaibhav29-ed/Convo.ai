# Convo.ai



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



Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

---


[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername) | [Email](mailto:your-email@gmail.com)
