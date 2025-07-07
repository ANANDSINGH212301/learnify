# Learnify - Language Learning Social Platform

![Learnify Logo](frontend/public/learnify-logo.png)

## Overview

Learnify is a social platform designed to connect language learners with native speakers for practice and cultural exchange. Users can find language partners based on their native and target languages, chat in real-time, and even have video calls to practice speaking skills.

## Features

- **User Authentication**: Secure signup, login, and profile management
- **Personalized Profiles**: Set native language, learning language, location, and bio
- **Friend System**: Send/receive friend requests and manage connections
- **Real-time Chat**: Text-based conversations with language partners
- **Video Calls**: Practice speaking with face-to-face video conversations
- **Recommendations**: Find language partners based on complementary language skills
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Customization**: Multiple theme options for personalized experience

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- DaisyUI
- React Router
- Tanstack Query
- Stream Chat & Video SDK
- Zustand (State Management)
- Lucide React (Icons)
- React Hot Toast (Notifications)

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- JWT Authentication
- Stream API (Chat & Video)
- bcrypt (Password Hashing)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB instance
- Stream account for Chat and Video APIs

### Environment Setup

1. **Backend (.env file)**
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

2. **Frontend (.env file)**
```
VITE_STREAM_API_KEY=your_stream_api_key
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/learnify.git
cd learnify
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Run the application**

Development mode:
```bash
# Run backend (from backend directory)
npm run dev

# Run frontend (from frontend directory)
npm run dev
```

Production mode:
```bash
# From root directory
npm run build
npm start
```

## Project Structure

```
learnify/
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── lib/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### User
- `GET /api/user/recommended` - Get recommended language partners
- `GET /api/user/friends` - Get user's friends
- `POST /api/user/onboard` - Complete user profile

### Friend Requests
- `POST /api/user/friend-request` - Send friend request
- `GET /api/user/friend-request/incoming` - Get incoming friend requests
- `GET /api/user/friend-request/outgoing` - Get outgoing friend requests
- `PUT /api/user/friend-request/:id/accept` - Accept friend request
- `PUT /api/user/friend-request/:id/reject` - Reject friend request

### Chat
- `GET /api/chat/token` - Get Stream chat token

## Deployment

The application is configured for easy deployment to platforms like Heroku, Vercel, or any other Node.js hosting service.

For production deployment:
1. Set `NODE_ENV=production` in your environment variables
2. Run `npm run build` to build the frontend
3. Start the server with `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- [Stream](https://getstream.io/) for their excellent Chat and Video SDKs
- [DaisyUI](https://daisyui.com/) for the beautiful UI components
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the frontend library
- [Express](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database