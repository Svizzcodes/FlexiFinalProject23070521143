# Color Palette Generator - Full Stack

A full-stack color palette generator with user authentication and palette management.

## Project Structure

```
├── backend/              # Node.js + Express + MongoDB
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # Helper utilities
│   └── server.js        # Entry point
│
├── src/                 # React + TypeScript + Vite (Frontend)
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── context/         # Auth context
│   ├── services/        # API service
│   └── App.tsx          # Main app component
│
└── README.md
```

## Project info

**URL**: https://lovable.dev/projects/d076c6eb-d8b0-4396-8ebb-8ab93c13c832

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d076c6eb-d8b0-4396-8ebb-8ab93c13c832) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/color-palette-db
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. Make sure MongoDB is running locally

5. Start the backend server:
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Frontend will run on `http://localhost:8080`

## Features

- User authentication (signup/login)
- Generate random color palettes
- Save and manage palettes
- View saved palettes
- Protected routes
- JWT-based authentication

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Palettes
- `POST /api/palettes` - Create palette
- `GET /api/palettes/user` - Get user palettes
- `GET /api/palettes/public` - Get public palettes
- `PUT /api/palettes/:id` - Update palette
- `DELETE /api/palettes/:id` - Delete palette

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Axios for API calls
- React Router for navigation

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d076c6eb-d8b0-4396-8ebb-8ab93c13c832) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
