# Blog API Backend

![GitHub package.json version](https://img.shields.io/github/package-json/v/anujbalak/blog-api-backend)
![GitHub issues](https://img.shields.io/github/issues/anujbalak/blog-api-backend)
![GitHub stars](https://img.shields.io/github/stars/anujbalak/blog-api-backend)
![GitHub forks](https://img.shields.io/github/forks/anujbalak/blog-api-backend)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![Express.js](https://img.shields.io/badge/Express.js-v5.1.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-v6.8.2-2D3748)
![Passport.js](https://img.shields.io/badge/Passport.js-Authentication-34D058)

A robust RESTful API backend for a blog application built with Node.js, Express.js, and Prisma ORM. Features comprehensive authentication, user management, blog post CRUD operations, and comment system.

## 🌐 Live Demo & Client Applications

- **🔗 Live API**: [https://blog-api-backend-xm9k.onrender.com/](https://blog-api-backend-xm9k.onrender.com/)
- **👥 User Client**: [Blog User Interface](https://github.com/anujbalak/blog-user) - Frontend for readers and commenters
- **✍️ Author Client**: [Blog Author Interface](https://github.com/anujbalak/blog-author) - Frontend for content creators and authors

## 🏗️ Complete Blog Ecosystem

This backend API serves two separate frontend applications:
- **User Interface**: Designed for readers to browse posts, read content, and interact through comments
- **Author Interface**: Comprehensive dashboard for authors to create, edit, and manage their blog posts

## 🚀 Features

### 🔐 Authentication & Authorization
- **Multiple Authentication Strategies**: JWT and Local authentication via Passport.js
- **Secure Session Management**: Express sessions with Prisma session store
- **Password Security**: Bcrypt hashing for secure password storage

### 📝 Blog Management
- **Full CRUD Operations**: Create, Read, Update, Delete blog posts
- **Author Management**: Authors can manage their own posts
- **Rich Content Support**: Support for various content types and formats

### 💬 Comment System
- **Comment CRUD**: Full comment management functionality
- **User Comments**: Users can comment on blog posts
- **Comment Moderation**: Authors can moderate comments on their posts

### 👤 User Management
- **User Registration & Login**: Secure user authentication
- **Profile Management**: Update user information and settings
- **Role-based Access**: Different permissions for users and authors

### 🛡️ Security Features
- **CORS Protection**: Cross-Origin Resource Sharing configuration
- **Input Validation**: Express-validator for request validation
- **Session Security**: Secure session management with express-session

## 🛠️ Technology Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5.1.0
- **Database ORM**: Prisma v6.8.2
- **Authentication**: Passport.js (Local & JWT strategies)
- **Password Hashing**: bcryptjs
- **Session Store**: Prisma Session Store
- **Validation**: Express Validator
- **Security**: CORS, Cookie Parser
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Database (PostgreSQL, MySQL, or SQLite)

## ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anujbalak/blog-api-backend.git
   cd blog-api-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_database_connection_string"
   
   # JWT
   JWT_SECRET="your_jwt_secret_key"
   JWT_REFRESH_SECRET="your_jwt_refresh_secret_key"
   
   # Session
   SESSION_SECRET="your_session_secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the server**
   ```bash
   # Production
   npm start
   
   # Development (with auto-reload)
   npm run watch
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

## 📚 API Documentation

### Base URL

**Development:**
```
http://localhost:3000
```

**Production:**
```
https://blog-api-backend-xm9k.onrender.com/
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | User login | No |
| POST | `/logout` | User logout | Yes |
| POST | `/refresh` | Refresh JWT token | Yes |

#### Register User
```http
POST /signup
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/:id` | Get user profile | Yes |
| PUT | `/users/:id/username` | Update user name | Yes |
| PUT | `/users/:id/password` | Change password | Yes |
| PUT | `/users/:id/email` | Change User Email | Yes |

### Blog Posts Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get all posts | No |
| GET | `/posts/:id` | Get specific post | No |
| POST | `/posts` | Create new post | Yes (Author) |
| PUT | `/posts/:id` | Update post | Yes (Author/Owner) |
| PUT | `/posts/:id/publish` | Publish the post | Yes (Author/Owner) |
| DELETE | `/posts/:id` | Delete post | Yes (Author/Owner) |
| GET | `/posts/author` | Get posts by author | No |

#### Create Post
```http
POST /posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "excerpt": "A brief description of the post",
  "published": true,
  "tags": ["technology", "programming"]
}
```

#### Update Post
```http
PUT /posts/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Blog Post Title",
  "content": "Updated content...",
  "published": true
}
```

### Comments Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/:postId/comments` | Get post comments | No |
| GET | `/posts/:postId/comments/:commentId` | Get specific post comment | No |
| POST | `/posts/:postId/comments` | Add comment to post | Yes |
| PUT | `/comments/:id` | Update comment | Yes (Owner) |
| DELETE | `/comments/:id` | Delete comment | Yes (Owner/Post Author) |

#### Add Comment
```http
POST /posts/:postId/comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "content": "Great post! Thanks for sharing.",
  "parentId": null
}
```

## 🔧 Scripts

- `npm start` - Start the production server
- `npm run watch` - Start development server with auto-reload
- `npm test` - Run tests (not implemented yet)

## 📁 Project Structure

```
blog-api-backend/
├── src/
│   ├── app.js              # Main application file
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Prisma models
│   ├── config/             # Configuration files
│   └── utils/              # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── .env                    # Environment variables
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Stateless authentication with secure JWT tokens
- **Session Management**: Secure session storage with Prisma
- **Input Validation**: All inputs validated using express-validator
- **CORS Protection**: Configured Cross-Origin Resource Sharing
- **Rate Limiting**: Protection against brute force attacks
- **Helmet**: Security headers for Express apps

## 🚀 Deployment

This API is currently deployed on Render and can be accessed at:
**https://blog-api-backend-xm9k.onrender.com/**

### Environment Variables for Production
```env
DATABASE_URL="your_production_database_url"
JWT_SECRET="your_production_jwt_secret"
JWT_REFRESH_SECRET="your_production_jwt_refresh_secret"
SESSION_SECRET="your_production_session_secret"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Anuj Balak**
- GitHub: [@anujbalak](https://github.com/anujbalak)
- Repository: [blog-api-backend](https://github.com/anujbalak/blog-api-backend)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Passport.js](http://www.passportjs.org/) - Simple, unobtrusive authentication
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing library

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/anujbalak/blog-api-backend/issues) on GitHub.

---

⭐ Star this repository if you find it helpful!