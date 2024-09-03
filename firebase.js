
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6RMgvsbt4EmtSKP8rSX6Zu2SKZOJQSMA",
  authDomain: "hospitality-d9246.firebaseapp.com",
  projectId: "hospitality-d9246",
  storageBucket: "hospitality-d9246.appspot.com",
  messagingSenderId: "502882302916",
  appId: "1:502882302916:web:8378ef9c5c51b48f94c291"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });

      
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };




  export const getMessagingInstance = () => {
  if (typeof window !== 'undefined') {
    const { getMessaging } = require("firebase/messaging");
    return getMessaging(app);
  }
  return null;
};

  