# RFC: Cross-Platform Native Mobile Bridge Architecture

## Status: Proposed / RFC
**Target Platforms**: iOS (App Store) & Android (Google Play)  
**Bridge Framework**: Capacitor 6 / Native Plugins  

---

## 1. Motivation & Technical Objectives

While the Uni-Verse web application runs smoothly in mobile web browsers, native mobile packaging provides hardware integrations crucial for student day-to-day life:
- **Biometric Authentication**: Fast Face ID / Touch ID / Android BiometricPrompt bypasses daily password entry.
- **Push Notification Service**: Direct APNs / FCM push for real-time exam announcements, bus delay alerts, and cafeteria food pickup tokens.
- **Background Geolocation**: Geofenced campus notifications (e.g. alert student when entering library about reserved books ready for pickup).
- **Haptic Feedback**: Crisp tactile feedback for button taps, bottom drawer sheet drags, and cart checkout confirmations.

---

## 2. Bridge Topology & Communication Layer

```
+--------------------------------------------------------------------+
|                   Uni-Verse Web Application Layer                  |
|                 (React 18 + Vite + Tailwind CSS)                   |
+--------------------------------------------------------------------+
                                  |
                                  v (Capacitor JavaScript Bridge)
+--------------------------------------------------------------------+
|                     Native Bridge Interface Layer                  |
|   [BiometricsPlugin]   [PushPlugin]   [HapticsPlugin]   [GeoPlugin]|
+--------------------------------------------------------------------+
                                  |
                   +--------------+--------------+
                   |                             |
                   v                             v
+-----------------------------+   +-----------------------------+
|        iOS Native OS        |   |       Android Native OS     |
|  (Swift / LocalAuthentication|  |  (Kotlin / BiometricManager |
|   / UserNotifications / APNs)|  |   / AndroidX Notifications) |
+-----------------------------+   +-----------------------------+
```

---

## 3. Native Feature Implementations

### Biometric Quick Unlock
```typescript
import { BiometricAuth } from '@capacitor-community/biometric-auth';

export async function authenticateWithBiometrics(): Promise<boolean> {
  const available = await BiometricAuth.checkBiometry();
  if (!available.isAvailable) return false;

  try {
    const result = await BiometricAuth.authenticate({
      reason: 'Confirm your identity to access student records',
      cancelTitle: 'Cancel',
      allowDeviceCredential: true,
    });
    return result.hasCredentials;
  } catch {
    return false;
  }
}
```

### Push Notification Token Registration
```typescript
import { PushNotifications } from '@capacitor/push-notifications';

export async function registerPushNotifications(): Promise<void> {
  const perm = await PushNotifications.requestPermissions();
  if (perm.receive === 'granted') {
    await PushNotifications.register();
  }

  PushNotifications.addListener('registration', async (token) => {
    // Send device push token to backend for user channel binding
    await fetch('/api/v1/notifications/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceToken: token.value, platform: 'capacitor' }),
    });
  });
}
```

---

## 4. Performance & Safe Area Handling
- **Safe Area Insets**: Native environment injects `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` custom properties into the root viewport to avoid camera notches and home indicator bars.
- **Hardware Acceleration**: Native WebViews enforce `WKWebView` on iOS and Chromium Hardware Canvas acceleration on Android.
- **Offline Shell**: HTML/CSS/JS bundles package directly inside the binary IPA/APK for zero-network initial boot time ($< 350\text{ ms}$).
