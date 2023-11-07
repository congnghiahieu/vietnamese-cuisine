require('dotenv').config();

module.exports = {
  expo: {
    'name': 'vietnamese-cuisine',
    'slug': 'vietnamese-cuisine',
    'version': '1.0.0',
    'orientation': 'portrait',
    'icon': './assets/images/new/icon.jpg',
    'scheme': 'myapp',
    'userInterfaceStyle': 'automatic',
    'splash': {
      'image': './assets/images/new/splash-3.png',
      'resizeMode': 'contain',
      'backgroundColor': '#FFF8F1',
    },
    'assetBundlePatterns': ['**/*'],
    'ios': {
      'supportsTablet': true,
    },
    'android': {
      'adaptiveIcon': {
        'foregroundImage': './assets/images/new/adaptive-icon.png',
        'backgroundColor': '#FFF8F1',
      },
    },
    'web': {
      'bundler': 'metro',
      'output': 'static',
      'favicon': './assets/images/favicon.png',
    },
    'plugins': ['expo-router'],
    'experiments': {
      'typedRoutes': true,
      'tsconfigPaths': true,
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
