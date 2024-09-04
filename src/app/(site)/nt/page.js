'use client'

import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db, getMessagingInstance } from "../../../../firebase";
import { useSession } from "next-auth/react"
import { savetoken } from "@/actions/user";

export default function App() {

  const [messaging, setMessaging] = useState(null);
  const { data: session, status } = useSession()


  useEffect(() => {
    if (!session) {
      return
    }


    const messagingInstance = getMessagingInstance();
    setMessaging(messagingInstance);
  }, [session]);

  async function saveTokenToFirestore(token) {
console.log(session.user)
    const userEmail = session.user?.email

    try {
      await savetoken(token)
      console.log("Token saved to Firestore");
    } catch (error) {
      console.error("Error saving token to Firestore:", error);
    }
  }

  async function requestPermission() {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BBxuIMYMA7AOZpa2mUvrzmbn3pj0bMswTJDU9snUayjKx_njNJP_BUC0EC1_ZfV4My7JmB7AGbI2L-haGAdhnJ0",
        });
        console.log("Token Gen", token);
        await saveTokenToFirestore(token);
      } else if (permission === "denied") {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("An error occurred while requesting permission", error);
    }
  }

  useEffect(() => {
    if (messaging) {
      requestPermission();
    }
  }, [messaging]);

  return (
    <div className="App">
      {/* Your component JSX */}
    </div>
  );
}