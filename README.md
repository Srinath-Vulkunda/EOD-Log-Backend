# EOD Log Backend API

A RESTful API backend for an End-of-Day (EOD) logging application that allows users to track their daily work progress, challenges, and mood.

## Features

- 🔐 **User Authentication** - JWT-based authentication with bcrypt password hashing
- 📝 **Daily Entry Management** - Create, read, update, and delete daily work logs
- 🔍 **Advanced Filtering** - Filter entries by date, mood, tags, and more
- 👥 **Team Support** - Team model structure for future collaboration features
- 🛡️ **Secure Routes** - Protected API endpoints with token verification middleware

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv

## Project Structure

```
backend/
├── config/
│   └── db.config.js          # Database connection configuration
├── controller/
│   ├── authController.js     # Authentication logic (register, login)
│   └── entryController.js    # Entry CRUD operations
├── middlewares/
│   └── verifyToken.js        # JWT verification middleware
├── models/
│   ├── entry.model.js        # Entry schema
│   ├── team.model.js         # Team schema
│   └── user.model.js         # User schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   └── entryRoute.js         # Entry routes
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
└── server.js                 # Application entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Entries

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/entries` | Get all user entries | Yes |
| POST | `/api/entries` | Create a new entry | Yes |
| GET | `/api/entries/:id` | Get entry by ID | Yes |
| PUT | `/api/entries/:id` | Update entry | Yes |
| DELETE | `/api/entries/:id` | Delete entry | Yes |
| GET | `/api/entries/user` | Get entries by user | Yes |
| GET | `/api/entries/filter` | Filter entries | Yes |

**Create Entry Request Body:**
```json
{
  "date": "2024-01-15",
  "completed": ["Completed task 1", "Completed task 2"],
  "struggles": ["Challenge faced"],
  "nextSteps": ["Plan for tomorrow"],
  "mood": "productive",
  "tags": ["development", "backend"],
  "isPublic": false
}
```

**Filter Query Parameters:**
- `date` - Filter by specific date
- `mood` - Filter by mood (happy, neutral, tired, stressed, productive)
- `tags` - Filter by tags (comma-separated)
- `completed` - Filter by completed items
- `struggles` - Filter by struggles
- `nextSteps` - Filter by next steps
- `isPublic` - Filter by public status (true/false)

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Data Models

### User Model
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (employee/admin)
- `avatar` - Profile picture URL

### Entry Model
- `user` - Reference to User
- `date` - Entry date
- `completed` - Array of completed tasks
- `struggles` - Array of challenges faced
- `nextSteps` - Array of planned next steps
- `mood` - User's mood (happy, neutral, tired, stressed, productive)
- `tags` - Array of tags
- `isPublic` - Public visibility flag

### Team Model
- `name` - Team name
- `description` - Team description
- `members` - Array of User references
- `createdBy` - User reference

## Scripts

- `npm start` - Start the server with nodemon (auto-restart on changes)

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **express-validator** - Request validation

## Development Dependencies

- **nodemon** - Development server with auto-restart

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Security

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 1 day
- Protected routes require valid authentication tokens
- CORS enabled for cross-origin requests

## Future Enhancements

- [ ] Team collaboration features
- [ ] Email notifications
- [ ] Analytics and reporting
- [ ] File attachments for entries
- [ ] Social features (sharing, commenting)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact
srinathvulkunda@gmail.com
For questions or support, please open an issue in the repository.

---

**Note:** Remember to never commit your `.env` file to version control. Add `.env` to your `.gitignore` file to keep your credentials safe.
