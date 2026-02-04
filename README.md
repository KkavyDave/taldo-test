# Taldo - Nurses to Germany Platform

A Next.js application for connecting Indian nurses with opportunities in Germany, featuring a blog system and webinar content management with a full-featured admin panel.

## Features

- 📝 **Blog System**: Dynamic blog posts with rich content
- 🎥 **Webinar Management**: YouTube Shorts integration
- 🔐 **Admin Panel**: Secure content management system
- 🗄️ **PostgreSQL Database**: Powered by Neon DB
- ⚡ **ISR**: Incremental Static Regeneration for optimal performance
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon DB)
- **ORM**: Prisma 7
- **Authentication**: JWT with bcryptjs
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Neon DB account ([neon.tech](https://neon.tech))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taldo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Connection (from Neon dashboard)
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   
   # Admin Authentication
   # Generate hash: node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
   ADMIN_PASSWORD_HASH="$2a$10$your-generated-hash"
   
   # JWT Secret (generate a random string)
   JWT_SECRET="your-secret-key-min-32-characters"
   
   # Base URL
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database**
   ```bash
   npx prisma db seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
taldo/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Data seeding script
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── admin/             # Admin panel routes
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog pages
│   │   └── webinar/           # Webinar page
│   ├── components/
│   │   ├── admin/             # Admin components
│   │   └── webinar/           # Webinar components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── auth.ts            # Auth utilities
│   └── data/                  # JSON data (for reference)
├── public/                    # Static assets
└── prisma.config.ts           # Prisma configuration
```

## Admin Panel

Access the admin panel at `/admin` with your configured password.

### Features:
- 📊 Dashboard with statistics
- ✍️ Create, edit, and delete blog posts
- 🎬 Manage YouTube Shorts (webinars)
- 🖼️ Image upload functionality
- 🔍 Search and filter content

## API Routes

### Blogs
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/[id]` - Get single blog
- `POST /api/blogs` - Create blog (admin)
- `PUT /api/blogs/[id]` - Update blog (admin)
- `DELETE /api/blogs/[id]` - Delete blog (admin)

### Webinars
- `GET /api/webinars` - Get all published webinars
- `POST /api/webinars` - Create webinar (admin)
- `PUT /api/webinars/[id]` - Update webinar (admin)
- `DELETE /api/webinars/[id]` - Delete webinar (admin)

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Check auth status

### Upload
- `POST /api/upload` - Upload images (admin)

## Database Schema

### Blog
- `id`: Unique identifier
- `slug`: URL-friendly identifier
- `title`: Blog title
- `date`: Publication date
- `image`: Featured image URL
- `intro`: Introduction text
- `paragraphs`: Content paragraphs (array)
- `bulletPoints`: Key points (array)
- `published`: Publication status
- `createdAt`, `updatedAt`: Timestamps

### Webinar
- `id`: Unique identifier
- `videoId`: YouTube video ID
- `title`: Optional title
- `description`: Optional description
- `order`: Display order
- `published`: Publication status
- `createdAt`, `updatedAt`: Timestamps

## Development

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Create migration
npx prisma db seed       # Seed database
npx prisma generate      # Generate Prisma Client

# Linting
npm run lint             # Run ESLint
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the application: `npm run build`
2. Set environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Start server: `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@taldo.com or open an issue in the repository.
