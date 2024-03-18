import 'dotenv/config';

export default {
  expo: {
    name: 'voyage-app',
    slug: 'voyage-app',
    version: '1.0.0',
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.arkar.voyage',
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
};
