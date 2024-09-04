import { NextRequest, NextResponse } from "next/server";

import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { prisma } from "@/utils/prismaDB";

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)
    admin.initializeApp({
      //@ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });
  }

export async function POST(request: NextRequest) {
    console.log("Reservation notification function triggered");
  
    const { reservationId, title, message, link } = await request.json();
  
    try {
      // Fetch the reservation and associated user from the database
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: { user: true },
      });
  
      if (!reservation) {
        return NextResponse.json({ success: false, message: "Reservation not found" }, { status: 404 });
      }
  console.log(reservation.user.email)
      // Fetch the user's token from Firebase
      const userSnapshot = await admin.firestore().collection('users')
        .where('email', '==', reservation.user.email)
        .get();
  
      if (userSnapshot.empty) {
        return NextResponse.json({ success: false, message: "User token not found" }, { status: 404 });
      }
  
      const userToken = userSnapshot.docs[0].data().token;
  
      if (!userToken) {
        return NextResponse.json({ success: false, message: "User token is null" }, { status: 400 });
      }
  console.log("wow",userToken)
      const payload: Message = {
        token: userToken,
        notification: {
          title: title,
          body: message,
        },
        webpush: link ? {
          fcmOptions: {
            link,
          },
        } : undefined,
      };
  
      // Send the notification
      const response = await admin.messaging().send(payload);
  
      console.log("Notification sent successfully:", response);
  
      return NextResponse.json({ 
        success: true, 
        message: `Notification sent successfully to user for reservation ${reservationId}` 
      });
  
    } catch (error) {
      console.error("Error sending notification:", error);
      return NextResponse.json({ success: false, message: "Error sending notification" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }