# Project Tech Stack Documentation

## Overview

This is a full-stack web application for an online learning platform that allows users to browse courses, read blogs, purchase content, and download PDF materials. The application follows a modern architecture with a React frontend and Flask backend.

---

## Table of Contents

1. [Frontend Stack](#frontend-stack)
2. [Backend Stack](#backend-stack)
3. [Database](#database)
4. [Authentication & Security](#authentication--security)
5. [Development Tools](#development-tools)
6. [Deployment & Production](#deployment--production)
7. [Key Features & Libraries](#key-features--libraries)

---

## Frontend Stack

### Core Framework & Runtime

- **React 19.1.1** - JavaScript library for building user interfaces
- **React Router 7.8.2** - Full-stack routing framework with SSR support
  - `@react-router/dev` - Development server and build tools
  - `@react-router/node` - Node.js server adapter
  - `@react-router/serve` - Production server
- **Node.js** - JavaScript runtime environment

### Build Tools

- **Vite 7.1.2** - Next-generation frontend build tool
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ES modules support
- **@vitejs/plugin-react 5.0.0** - Official React plugin for Vite

### UI Framework & Styling

- **Bootstrap 5.3.8** - CSS framework for responsive design
- **Sass 1.93.3** - CSS preprocessor for advanced styling
- **FontAwesome 7.1.0** - Icon library
  - `@fortawesome/fontawesome-svg-core`
  - `@fortawesome/free-solid-svg-icons`
  - `@fortawesome/free-regular-svg-icons`
  - `@fortawesome/react-fontawesome`

### 3D Graphics & Animation

- **Three.js 0.181.0** - 3D graphics library for WebGL
- **Postprocessing 6.37.8** - Post-processing library for Three.js effects

### Content Rendering

- **React Markdown 10.1.0** - Markdown to React component renderer
  - Used for displaying course content and blog posts

### Development Dependencies

- **TypeScript** - Type definitions for React
  - `@types/react 19.1.10`
  - `@types/react-dom 19.1.7`
- **ESLint 9.33.0** - Code linting and quality
  - `eslint-plugin-react-hooks` - React Hooks linting rules
  - `eslint-plugin-react-refresh` - React Fast Refresh linting
- **Vercel Adapter** - `@vercel/react-router 1.2.3` for Vercel deployment

### Utility Libraries

- **isbot 5.x** - User agent detection for bot filtering

---

## Backend Stack

### Core Framework

- **Flask 3.1.2** - Python web framework
- **Python 3.13** - Programming language runtime
- **Gunicorn 23.0.0** - WSGI HTTP server for production

### Database & ORM

- **SQLAlchemy 2.0.44** - SQL toolkit and ORM
- **Flask-SQLAlchemy 3.1.1** - Flask extension for SQLAlchemy
- **Flask-Migrate 4.1.0** - Database migrations using Alembic
- **Alembic 1.17.1** - Database migration tool
- **PostgreSQL (psycopg2-binary 2.9.11)** - Production database driver
- **SQLite** - Development database (default)

### API & Middleware

- **Flask-CORS 6.0.1** - Cross-Origin Resource Sharing support
- **Werkzeug 3.1.3** - WSGI utility library

### Authentication & Security

- **PyJWT 2.10.1** - JSON Web Token implementation
- **itsdangerous 2.2.0** - Data signing and verification

### PDF Generation

- **WeasyPrint 63.1** - HTML/CSS to PDF converter
  - Generates course PDFs with light/dark themes
  - Supports markdown rendering in PDFs
- **Markdown 3.7** - Markdown to HTML converter
  - Extensions: fenced_code, codehilite, tables, nl2br, sane_lists

### Template Engine

- **Jinja2 3.1.6** - Template engine for Python
- **MarkupSafe 3.0.3** - Safe string escaping for templates

### Utilities & Helpers

- **python-dotenv 1.2.1** - Environment variable management
- **Colorama 0.4.6** - Terminal color output
- **Click 8.3.0** - Command-line interface creation
- **Faker 37.12.0** - Fake data generation for testing/seeding

### Dependencies

- **Blinker 1.9.0** - Signal/event dispatching
- **Greenlet 3.2.4** - Lightweight concurrency
- **Mako 1.3.10** - Template library (used by Alembic)
- **Packaging 25.0** - Core packaging utilities
- **typing-extensions 4.15.0** - Type hints backport
- **tzdata 2025.2** - Timezone data

---

## Database

### Development

- **SQLite** - Default development database
  - File-based database
  - Zero configuration
  - Located at `backend/instance/database.db`

### Production

- **PostgreSQL** - Production database
  - Configured via `DATABASE_URL` environment variable
  - Driver: psycopg2-binary

### Database Schema

Key models include:

- **User** - User accounts with authentication
- **Course** - Course information, content, and metadata
- **Blog** - Blog posts and articles
- **Purchase** - Course purchase records
- **Contact** - Contact form submissions
- **Article** - Additional article content
- **Shop** - E-commerce items (if applicable)

### Migrations

- **Alembic** - Database version control
- **Flask-Migrate** - Flask integration for Alembic

Custom migration commands:
```bash
pipenv run db-init      # Initialize migrations
pipenv run db-migrate   # Create migration
pipenv run db-upgrade   # Apply migrations
pipenv run db-seed      # Seed database
pipenv run db-fullinit  # Full initialization
```

---

## Authentication & Security

### Authentication Method

- **JWT (JSON Web Tokens)** - Stateless authentication
  - Token stored in browser localStorage
  - Token sent via Authorization header: `Bearer <token>`
  - Middleware: `@token_required` decorator

### Security Features

- **CORS Configuration** - Restricted origins
  - Configurable via `ALLOWED_ORIGINS` environment variable
  - Default: `http://localhost:5173,http://127.0.0.1:5173`
- **Password Security** - Hashed passwords (implementation details in User model)
- **Data Signing** - itsdangerous for secure data serialization
- **Secret Key** - Configured via `SECRET_KEY` environment variable

### Authorization

- **Role-based access** - User ownership verification
- **Course ownership** - Users can only download PDFs for owned courses
- **Protected routes** - Token validation on sensitive endpoints

---

## Development Tools

### Package Management

#### Frontend
- **npm** - Node package manager
- Package definition: `package.json`

#### Backend
- **Pipenv** - Python dependency management
- Package definition: `Pipfile` and `requirements.txt`
- Virtual environment management
- Dependency locking via `Pipfile.lock`

### Development Servers

#### Frontend
```bash
npm run dev           # React Router dev server
```
- Hot Module Replacement (HMR)
- Fast refresh
- Port: 5173 (default)

#### Backend
```bash
pipenv run dev        # Flask development server
```
- Auto-reload on file changes
- Debug mode
- Port: 5000 (default)

### Code Quality

- **ESLint** - JavaScript/React linting
- **Type Checking** - TypeScript type definitions
- **Python Virtual Environment** - Isolated dependencies

### Testing

- **pytest** - Python testing framework (dev dependency)

### Database Tools

- **Faker** - Test data generation
- **Alembic** - Migration management
- Custom seed scripts for sample data

---

## Deployment & Production

### Production Server

- **Gunicorn** - Production WSGI server for Flask
- **React Router Serve** - Production server for frontend

### Build Process

#### Frontend
```bash
npm run build         # Build for production
npm run start         # Start production server
```
- Optimized bundles
- Code splitting
- Asset optimization

#### Backend
- No build step required (Python)
- Database migrations applied before deployment

### Environment Configuration

Required environment variables:

**Backend (.env):**
```
SECRET_KEY=<your-secret-key>
DATABASE_URL=<database-connection-string>
ALLOWED_ORIGINS=<comma-separated-origins>
```

**Frontend:**
- API endpoint configuration in `app/utils/api.js`

### Deployment Platforms

- **Vercel** - Frontend deployment ready
  - Configuration: `@vercel/react-router` adapter
- **Heroku/Railway/Render** - Backend deployment options
  - PostgreSQL database
  - Gunicorn WSGI server

---

## Key Features & Libraries

### PDF Generation System

**Technology:** WeasyPrint + Markdown

**Features:**
- HTML/CSS to PDF conversion
- Markdown content rendering
- Code syntax highlighting
- Dual theme support (light/dark)
- Custom styling with CSS
- Dynamic content generation
- Page break control

**Implementation:**
- Backend: `app/pdf_generator.py`
- Endpoint: `/courses/<id>/download-pdf?theme=<light|dark>`
- Authentication: JWT required
- Authorization: Course ownership verification

### Course Management

**Features:**
- Course browsing by topic (frontend, backend, database, git)
- Course details with markdown content
- Course purchasing system
- Favorite courses
- Requirements tracking
- PDF download for owned courses

**Technology:**
- React components with loaders
- SQLAlchemy models
- JSON field types for flexible content
- Markdown rendering with React Markdown

### Blog System

**Features:**
- Blog listing and detail views
- Author information
- Publication dates
- Tag system with colors
- Favorite blogs
- Markdown content support

**Technology:**
- React Router loaders
- SQLAlchemy JSON fields
- Tag visualization with Bootstrap badges

### User Management

**Features:**
- User registration and login
- Profile management
- Purchase history
- Owned courses tracking
- Favorite courses/blogs
- Contact form submissions

**Technology:**
- JWT authentication
- Protected routes
- Token middleware

### 3D Graphics (Homepage)

**Features:**
- Interactive 3D scenes
- Post-processing effects
- WebGL rendering

**Technology:**
- Three.js
- Postprocessing library
- React integration

### File Upload System

**Features:**
- Static file serving
- Image uploads
- File size limits

**Technology:**
- Flask static folder
- Configuration: `MAX_CONTENT_LENGTH`

---

## Architecture Patterns

### Frontend Architecture

- **Component-based** - Reusable React components
- **File-based routing** - React Router v7 conventions
- **Data loading** - Route-level loaders for SSR
- **Context API** - Authentication context (`AuthContext`)
- **Utility modules** - API calls, helpers, constants

### Backend Architecture

- **Blueprints** - Modular route organization
- **MVC Pattern** - Models, routes (controllers), templates (if any)
- **Middleware** - Authentication, error handling, CORS
- **Factory Pattern** - `create_app()` application factory
- **Repository Pattern** - SQLAlchemy ORM for data access

### API Design

- **RESTful** - Resource-based endpoints
- **JSON** - Request and response format
- **Status Codes** - Standard HTTP status codes
- **Error Handling** - Consistent error responses

---

## Performance Optimizations

### Frontend

- **Code Splitting** - React Router automatic splitting
- **Lazy Loading** - Component-level lazy loading
- **Asset Optimization** - Vite production builds
- **Caching** - Browser caching strategies

### Backend

- **Database Indexing** - Strategic indexes on commonly queried fields
- **Connection Pooling** - SQLAlchemy connection management
- **JSON Fields** - Flexible schema without joins
- **Query Optimization** - Efficient SQLAlchemy queries

---

## Development Workflow

### Getting Started

1. **Clone Repository**
2. **Backend Setup:**
   ```bash
   cd backend
   pipenv install
   pipenv run db-fullinit
   pipenv run dev
   ```
3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Database Management

```bash
# Create migration
pipenv run db-migrate

# Apply migrations
pipenv run db-upgrade

# Seed database
pipenv run db-seed

# Rollback migration
pipenv run db-downgrade
```

### Code Style

- **Frontend:** ESLint configuration
- **Backend:** Python PEP 8 style guide

---

## Future Considerations

### Potential Upgrades

- **Payment Integration** - Stripe/PayPal integration
- **Email Service** - Transactional emails (SendGrid, AWS SES)
- **CDN** - Static asset delivery
- **Redis** - Caching layer
- **Celery** - Background task processing
- **S3** - File storage
- **Docker** - Containerization
- **CI/CD** - Automated testing and deployment

### Scalability

- **Load Balancing** - Multiple server instances
- **Database Replication** - Read replicas
- **Caching Strategy** - Redis/Memcached
- **Message Queue** - RabbitMQ/Redis for async tasks

---

## Version Information

- **Frontend Package Version:** 0.0.0
- **Python Version:** 3.13
- **Node Version:** Compatible with npm (check `.nvmrc` or package.json engines)

---

## License & Credits

This tech stack documentation provides a comprehensive overview of the technologies, patterns, and practices used in this learning platform application.

**Last Updated:** November 2025
