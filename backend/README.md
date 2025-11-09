# Color Palette Generator - Backend

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Make sure MongoDB is running on `mongodb://localhost:27017`

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/color-palette-db
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Run the Server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Palettes
- `POST /api/palettes` - Create new palette (Protected)
- `GET /api/palettes/user` - Get user's palettes (Protected)
- `GET /api/palettes/public` - Get all public palettes
- `PUT /api/palettes/:id` - Update palette (Protected)
- `DELETE /api/palettes/:id` - Delete palette (Protected)

## Testing the API

Use Postman or any API client to test the endpoints at `http://localhost:5000`
