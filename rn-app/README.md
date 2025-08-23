# Fantasy Basketball App

A React Native app built with Expo for fantasy basketball games.

## Features

- **Two Games**: Pyramid and Blow Out
- **Authentication**: Login/Register required before accessing features
- **Splash Screen**: App starts with a splash screen
- **Leaderboards**: View scores for both game types

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your phone (for testing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with Expo Go app on your phone, or press:
   - `a` for Android emulator
   - `i` for iOS simulator (Mac only)
   - `w` for web browser

### Backend Setup

The app requires a backend server running on `http://localhost:3000`. See the `../backend` directory for setup instructions.

### Environment Variables

Create a `.env` file in the backend directory with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/fantasy
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
NBA_API_URL=https://api.example.com/nba
PORT=3000
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # App screens
└── types/         # TypeScript type definitions
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS (Mac only)
- `npm run web` - Start in web browser
- `npm run lint` - Run ESLint 