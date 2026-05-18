# Setup & Troubleshooting Guide

## Issue: react-native-reanimated Plugin Error

**Error Message:**
```
PluginError: Unable to resolve a valid config plugin for react-native-reanimated.
```

### ✅ Solution Applied

The `react-native-reanimated` has been removed from the plugins array in `app.json`. The library is still installed and can be used in your code, but it doesn't need Expo's config plugin system.

### 🔧 If You Still Get Errors, Follow These Steps:

#### Step 1: Clean Installation
```bash
# Remove node_modules and lockfile
rm -rf node_modules
rm package-lock.json  # or yarn.lock / pnpm-lock.yaml

# Reinstall dependencies
npm install --legacy-peer-deps
```

#### Step 2: Clear Expo Cache
```bash
# Clear Expo cache
npx expo start --clear
```

#### Step 3: Clean Build
On your device/emulator:
- Delete the app completely
- Clear app cache
- Reinstall fresh

#### Step 4: Rebuild
```bash
npm start
# Select platform: a (Android), i (iOS), w (Web)
```

---

## Package Manager Compatibility

### Windows/Linux - Use npm:
```bash
npm install --legacy-peer-deps
npm start
```

### macOS with M1/M2 - Use npm (not yarn):
```bash
npm install --legacy-peer-deps
npm start
```

---

## Dependency Versions

The app uses these versions:
- `react-native`: 0.81.5
- `expo`: ~54.0
- `react-native-reanimated`: ^4.3
- `nativewind`: 4.2.4

**These versions are compatible** - the reanimated plugin error is just a configuration issue that's been fixed.

---

## Common Issues & Fixes

### Issue: "Cannot find module 'publicGlobals'"
**Fix:** Already applied - reanimated removed from plugins array

### Issue: "expo not found"
```bash
npm install -g expo-cli
expo start
```

### Issue: Port 8081 already in use
```bash
# Kill the process on port 8081
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8081
kill -9 <PID>
```

### Issue: App crashes on startup
```bash
# Clear all caches
npm start -- --clear
```

---

## Installation Checklist

- [ ] Node.js v16+ installed
- [ ] npm installed and working
- [ ] Project directory copied to local machine
- [ ] `npm install --legacy-peer-deps` completed
- [ ] No errors in terminal after install
- [ ] `npm start` runs without errors
- [ ] Can see Expo QR code in terminal

---

## Running the App

### Web (Easiest to Start)
```bash
npm start
# Press 'w' for web
# Opens in browser at http://localhost:8081
```

### Android
```bash
npm start
# Press 'a' for Android
# Make sure Android emulator is running or device connected
```

### iOS (macOS Only)
```bash
npm start
# Press 'i' for iOS
# iPhone simulator must be installed
```

---

## What's Changed

**File Modified:** `app.json`

**Change Made:**
```diff
"plugins": [
  ["expo-font"],
  ["expo-router"],
- ["react-native-reanimated"]
]
```

**Why:** 
- `react-native-reanimated` is a runtime library, not a config plugin
- Keeping it in plugins caused Expo to try loading it as a plugin
- Removing it from plugins allows Expo to work correctly
- The library still works normally when imported in code

---

## Verification

After installation, verify everything works:

```bash
npm start
```

You should see:
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   Expo Go                                                  │
│                                                            │
│   ► Android:     Use Expo Go                               │
│   ► iOS:         Use Expo Go                               │
│   ► Web:         Press 'w'                                 │
│                                                            │
│   Metro Bundler ready at http://localhost:8081             │
│                                                            │
└────────────────────────────────────────────────────────────┘

Press 'a' │ 'i' │ 'w' to open the app or
```

---

## Still Having Issues?

1. Check that you're in the right directory: `/your-path/srm-sarthi-native`
2. Verify Node.js version: `node --version` (should be 16+)
3. Clear everything: Delete `node_modules` and reinstall
4. Check internet connection (npm needs to download packages)
5. Update npm: `npm install -g npm@latest`

---

## Next Steps

Once app runs successfully:
1. Test all 4 tabs (Trains, Buses, Explore, Profile)
2. Fill in profile onboarding
3. Click through features
4. Plan API integration for real data

Happy coding! 🚀
