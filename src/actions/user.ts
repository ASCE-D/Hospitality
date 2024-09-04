"use server"

import { authOptions } from '@/utils/auth';
import { prisma } from '@/utils/prismaDB';
import { getServerSession } from 'next-auth';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

export async function savetoken(token:any) {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return { error: "Unauthorized or insufficient permissions" };
    }
  
    const userEmail = session.user.email;
  
    try {
        // Fetch user data from the database
        const user = await prisma.user.findUnique({
          where: { email: userEmail as string },
          include: { restaurant: true }
        })
    
        if (!user) {
          console.error("User not found in the database")
          return
        }
    
        // Prepare the data to be saved in Firestore
        const userData = {
          token: token,
          role: user.role,
          email: user.email,
          name: user.name,
          restaurantId: '',
        }
    
        // If the user is a restaurant owner, include the restaurant ID
        if (user.role === 'RESTAURANT_OWNER' && user.restaurant) {
          userData.restaurantId = user.restaurant.id
        }
    console.log(userData)
        // Save the data to Firestore
        //@ts-ignore
        await setDoc(doc(db, "users", userEmail), userData, { merge: true })
        console.log("Token and user data saved to Firestore")
      } catch (error) {
        console.error("Error saving data to Firestore:", error)
      }
  }
  
  export async function usersavetoken(token:any) {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return { error: "Unauthorized or insufficient permissions" };
    }
  
    const userEmail = session.user.email;
  
    try {
        // Fetch user data from the database
        const user = await prisma.user.findUnique({
          where: { email: userEmail as string },
          include: { reservations: true }
        })
    
        if (!user) {
          console.error("User not found in the database")
          return
        }
    
        // Prepare the data to be saved in Firestore
        const userData = {
          token: token,
          role: user.role,
          email: user.email,
          name: user.name,
          reservationId: '',
        }
    
        // If the user is a restaurant owner, include the restaurant ID
        if (user.role === 'RESTAURANT_OWNER' && user.reservations) {
          userData.reservationId = user.reservations[0].id
        }
    console.log(userData)
        // Save the data to Firestore
        //@ts-ignore
        await setDoc(doc(db, "users", userEmail), userData, { merge: true })
        console.log("Token and user data saved to Firestore")
      } catch (error) {
        console.error("Error saving data to Firestore:", error)
      }
  }
  


  