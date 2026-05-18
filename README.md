# SRM Sarthi - React Native Mobile App

A production-ready React Native Expo mobile application for SRMIST students to track daily commutes with real-time train schedules, bus routes, and campus navigation.

## Features

### 🚂 Trains
- **Station Board**: Live train schedules from Potheri station
- **Train Search**: Search trains between any two stations
- **Train Tracking**: Track specific trains and view full routes
- **Real-time Info**: Delay status, platform numbers, and distance info

### 🚌 Buses
- **Bus Routes**: Browse all available bus services to campus
- **Route Details**: View stops, fare, duration, and frequency
- **Booking Integration**: Ready to integrate with seat booking systems

### 🗺️ Explore
- **Campus Map**: Visual layout of SRM campus
- **Location Finder**: Find important campus locations
- **Directions**: Quick access to campus navigation

### 👤 Profile
- **User Profile**: Set name, year, and branch
- **Onboarding**: First-time user setup flow
- **Settings**: Notification and preference management
- **Profile Management**: Edit and update profile information

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (Tab-based navigation)
- **Styling**: NativeWind (Tailwind CSS)
- **Animations**: React Native Reanimated
- **Icons**: Material Icons (via @expo/vector-icons)
- **State Management**: React Hooks
- **TypeScript**: Full type safety

## Project Structure

```
srm-sarthi-native/
├── app/
│   ├── _layout.tsx           # Root navigation layout
│   ├── tabs/
│   │   ├── trains.tsx        # Train schedule screen
│   │   ├── buses.tsx         # Bus routes screen
│   │   ├── explore.tsx       # Campus exploration screen
│   │   └── profile.tsx       # User profile screen
│   └── modals/               # Reusable modals
├── components/
│   ├── train-card.tsx        # Train display component
│   ├── station-board.tsx     # Station board display
│   └── ...                   # Other reusable components
├── lib/
│   ├── colors.ts             # Color system and theme
│   ├── train-types.ts        # Type definitions (from web)
│   ├── srm-data.ts           # Mock data and constants
│   └── utils.ts              # Utility functions
├── assets/                   # App icons and images
└── app.json                  # Expo configuration
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

2. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on different platforms:**
   ```bash
   npm run android  # Android emulator/device
   npm run ios      # iOS simulator (macOS only)
   npm run web      # Web browser
   ```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## Design System

### Colors
- **Primary**: #2dd4bf (Teal)
- **Accent**: #fbbf24 (Amber)
- **Background**: #0a0f1a (Dark)
- **Card**: #0f172a (Darker)
- **Text**: #f5f5f7 (Light gray)

### Typography
- **Heading**: Bold, 28px
- **Subheading**: Bold, 14-16px
- **Body**: Regular, 13-14px
- **Caption**: 11-12px

## Features Implemented

✅ Tab-based navigation (4 main screens)
✅ Train schedule display and search
✅ Train route tracking with details
✅ Bus route browsing
✅ Bus route details modal
✅ Campus location finder
✅ User profile management
✅ Onboarding flow for new users
✅ Settings and preferences
✅ Dark mode (default)
✅ Full TypeScript support
✅ Responsive design

## Future Enhancements

- Real API integration for live train schedules
- Interactive campus map with React Native Maps
- Push notifications for train delays
- Favorites and saved routes
- Real-time location tracking
- Seat booking integration
- User authentication
- Offline support with AsyncStorage
- Performance optimizations

## Development Notes

- All data is currently mock data for demonstration
- Replace API calls in respective screens for real data
- Font loading is handled via expo-font
- Safe area context is used for proper viewport handling
- Reanimated is configured but basic animations are used
- NativeWind configuration requires matching setup

## Building for Production

### Android APK
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

### Web
```bash
npm run web
# Then build with: npx expo export --platform web
```

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Keep components focused and reusable
4. Follow the design system for consistency

## License

MIT License - SRM Sarthi Team

## Support

For issues or feature requests, contact the development team.
