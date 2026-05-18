# 🚀 SRM Sarthi React Native - Quick Start Guide

## Get Started in 2 Minutes

### 1. **Install & Run**
```bash
# Navigate to project
cd /vercel/share/srm-sarthi-native

# Install dependencies (first time only)
npm install --legacy-peer-deps

# Start the app
npm start
```

### 2. **Choose Your Platform**
When you see the Expo menu, press:
- **a** - Run on Android (emulator/device)
- **i** - Run on iOS simulator (macOS only)
- **w** - Run in web browser

### 3. **Explore the App**
The app will load with 4 main tabs at the bottom:

#### 🚂 **Trains Tab**
- View live station board from Potheri
- Search trains between stations
- Track specific trains by number
- See detailed routes with stops

#### 🚌 **Buses Tab**
- Browse available bus routes
- View route details (fare, stops, frequency)
- Ready for seat booking integration

#### 🗺️ **Explore Tab**
- Visual campus overview
- Find important locations
- Distance information for navigation

#### 👤 **Profile Tab**
- Setup profile (first visit)
- Manage settings and preferences
- Edit profile information

---

## 📋 What's Already Implemented?

✅ **Complete UI** - All 4 screens with full design  
✅ **Navigation** - Tab-based with smooth transitions  
✅ **Dark Theme** - Modern dark mode throughout  
✅ **Mock Data** - Ready-to-use test data  
✅ **Type Safety** - Full TypeScript support  
✅ **Responsive** - Works on all screen sizes  

---

## 🔧 Common Development Tasks

### Add a New Screen
```typescript
// Create app/tabs/newscreen.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/lib/colors';

export default function NewScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Your content */}
    </SafeAreaView>
  );
}
```

### Add a New Component
```typescript
// Create components/my-component.tsx
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/lib/colors';

export function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    padding: 16,
  },
  text: {
    color: Colors.foreground,
  },
});
```

### Update Colors
Edit `lib/colors.ts`:
```typescript
export const Colors = {
  background: '#0a0f1a', // Change here
  // ... rest
};
```

### Add Mock Data
Edit `lib/srm-data.ts` and add your data arrays

---

## 🎨 Design System Quick Reference

| Element | Color | Usage |
|---------|-------|-------|
| Buttons | #2dd4bf | Primary actions |
| Highlights | #fbbf24 | Secondary emphasis |
| Background | #0a0f1a | Main screen bg |
| Cards | #0f172a | Container bg |
| Text | #f5f5f7 | Primary text |
| Muted | #a0aec0 | Secondary text |

---

## 📱 Testing on Device

### Android Device
1. Install Expo app from Google Play
2. Run `npm start`
3. Scan QR code with phone camera
4. App opens in Expo app

### iPhone (need macOS)
1. Install Expo app from App Store
2. Run `npm start`
3. Scan QR code with phone camera
4. App opens in Expo app

---

## 🐛 Debugging

### View Console Logs
```bash
# In Expo menu:
# Press 'j' for Android
# Press 'i' for iOS
```

### Use React DevTools
```bash
npm install --save-dev @react-navigation/devtools
```

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

---

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `app/_layout.tsx` | Tab navigation setup |
| `app/tabs/*.tsx` | Main screens |
| `components/*.tsx` | Reusable components |
| `lib/colors.ts` | Design tokens |
| `lib/srm-data.ts` | Mock data |
| `app.json` | Expo config |

---

## 🚀 Next Steps

### For Testing
1. Run the app
2. Fill in profile onboarding
3. Click through all tabs
4. Test modals and navigation

### For Development
1. Understand the structure (5 min read through files)
2. Make a small change (colors, text)
3. Hot reload to see changes
4. Build new features

### For Deployment
1. Replace mock data with APIs
2. Add app icons (192x192px)
3. Setup EAS build (`eas build --platform android`)
4. Submit to app stores

---

## 💡 Pro Tips

- **Hot Reload**: Changes appear instantly
- **Ctrl+C**: Stop development server
- **Clear Cache**: `npm install` then `npm start`
- **Check Logs**: Use phone console logs for debugging
- **Use TypeScript**: Catch errors before runtime

---

## ❓ FAQ

**Q: Why can't I see console logs?**
A: Press 'j' (Android) or 'i' (iOS) in Expo menu

**Q: How do I reset the app?**
A: Delete app from device/emulator and reinstall

**Q: Can I test on web?**
A: Yes! Press 'w' in Expo menu

**Q: How do I change the app name?**
A: Edit `app.json` name field

**Q: Where's the actual data?**
A: Currently mock data in `lib/srm-data.ts` - replace with API calls

---

## 📞 Need Help?

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **TypeScript**: https://www.typescriptlang.org
- **Check BUILD_SUMMARY.md**: Full technical details

---

## ✅ Checklist Before First Run

- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm install`)
- [ ] Can run `expo start` without errors
- [ ] Can see Expo QR code
- [ ] Expo app installed on phone (optional)

---

**Ready to code!** 🎉

Start with: `npm start`
