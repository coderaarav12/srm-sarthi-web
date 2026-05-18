# Setup & Troubleshooting Guide

## Issue: react-native-worklets Module Error

**Error Message:**
```
ERROR Cannot find module 'react-native-worklets/plugin'
Require stack: react-native-reanimated/plugin/index.js
```

### ✅ Solution Applied

The `react-native-reanimated` package has been completely removed from `package.json` dependencies because:
1. The app doesn't use advanced animation features from reanimated
2. Basic React Native animations work fine without it
3. Removing it eliminates the Babel plugin error entirely

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

#### Step 3: Verify Installation
```bash
# Check that react-native-reanimated is NOT in node_modules
ls node_modules | grep reanimated
# Should return nothing
```

#### Step 4: Rebuild
```bash
npm start
# Select platform: a (Android), i (iOS), w (Web)
```

---

## What Changed

### File Modified: `package.json`

**Removed:**
```json
"react-native-reanimated": "^4.3.1"
```

**Why:** 
- Reanimated is primarily for complex, high-performance animations
- The app uses standard React Native animations which work perfectly fine
- Removing the dependency eliminates all Babel plugin conflicts
- App size is slightly reduced

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

## Current Dependency Versions

The app now uses these core versions:
- `react-native`: 0.81.5
- `expo`: ~54.0
- `nativewind`: 4.2.4
- `react-navigation`: 7.x

**All dependencies are compatible** - no conflicts.

---

## Common Issues & Fixes

### Issue: "Cannot find module 'react-native-worklets'"
**Fix:** Already applied - reanimated removed completely

### Issue: "expo not found"
```bash
npm install -g expo-cli
expo start
```

### Issue: "Port 8081 already in use"
```bash
# Kill the process on port 8081
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8081
kill -9 <PID>
```

### Issue: "Module not found after install"
```bash
# Clear all caches completely
rm -rf node_modules
npm cache clean --force
npm install --legacy-peer-deps
npm start -- --clear
```

### Issue: "App crashes on startup"
```bash
# Full clean rebuild
rm -rf node_modules
rm package-lock.json
npm install --legacy-peer-deps
npm start -- --clear
```

---

## Installation Checklist

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed and working (`npm --version`)
- [ ] Project copied to local machine
- [ ] Old `node_modules` deleted (if upgrading)
- [ ] `npm install --legacy-peer-deps` completed successfully
- [ ] No errors in terminal after install
- [ ] `npm start` runs without errors
- [ ] Can see Expo QR code in terminal
- [ ] No mention of "react-native-reanimated" in output

---

## Running the App

### Web (Recommended for Testing)
```bash
npm install --legacy-peer-deps
npm start
# Press 'w' for web
# Opens in browser at http://localhost:8081
```

### Android (Requires Emulator or Device)
```bash
npm install --legacy-peer-deps
npm start
# Press 'a' for Android
# Make sure Android emulator is running or device connected via USB
```

### iOS (macOS Only)
```bash
npm install --legacy-peer-deps
npm start
# Press 'i' for iOS
# iPhone simulator must be installed via Xcode
```

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
│ › Press 'a' │ 'i' │ 'w' to open the app on a platform    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### ✅ Success Indicators:
- No errors in the output
- QR code displayed
- Metro bundler shows "ready"
- No mention of "reanimated" or "worklets"

---

## Build Output Issues

If you see build errors mentioning:
- `react-native-reanimated`
- `react-native-worklets`
- `babel-plugin`

**Solution:** You likely have an old `node_modules`. Do a complete clean:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start -- --clear
```

---

## Testing the App

Once the app starts successfully:

1. **Web Version (Easiest)**
   - Open http://localhost:8081 in browser
   - Click through all 4 tabs
   - Fill in profile onboarding
   - Test all features

2. **Mobile Version**
   - Install Expo Go app on your phone
   - Scan QR code from terminal
   - App opens in Expo Go
   - Same features as web version

---

## Deployment

Once development is complete:

### Build for Android
```bash
npm install -g eas-cli
eas build --platform android
```

### Build for iOS (macOS only)
```bash
npm install -g eas-cli
eas build --platform ios
```

---

## Still Having Issues?

1. **Check directory**: Make sure you're in `srm-sarthi-native` folder
2. **Node version**: `node --version` should be 16+
3. **NPM version**: `npm --version` should be 8+
4. **Internet**: Needed for npm to download packages
5. **Antivirus**: Check if blocking npm downloads
6. **Permissions**: Run with appropriate permissions on Windows
7. **PATH**: Make sure npm is in system PATH

### Reset Everything
```bash
# Full clean slate
rm -rf node_modules
rm package-lock.json
rm .expo
npm cache clean --force
npm install --legacy-peer-deps
npm start -- --clear
```

---

## Success!

If you've followed these steps and see the Expo QR code without errors, you're ready to test the app!

Next steps:
1. Press 'w' for web version
2. Test all 4 tabs
3. Try the profile onboarding
4. Review the code in your IDE

Happy coding! 🚀
