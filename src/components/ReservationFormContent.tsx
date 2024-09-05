"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/context/NotificationContext";
import useFcmToken from "@/hooks/useFcmtoken";
import { sendresendemail } from "@/actions/sendemail";

export default function ReservationFormContent({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [dateTime, setDateTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const { addNotification } = useNotification();
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId,
          dateTime,
          partySize: parseInt(partySize),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      const newReservation = await response.json();
      console.log("Created reservation:", newReservation.reservation);
   
      const dateTime2: any = new Date(newReservation.reservation.dateTime);

      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Change to true if you prefer 12-hour format
      }).format(dateTime2);
      const response2 = await fetch("/api/restaurantnoti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          restaurantId: newReservation.reservation.restaurantId,
          title: "newReservation request",
          message: `Party size ${newReservation.reservation.partySize} on ${formattedDate}`,
          link: "/dashboard/restaurant",
        }),
      });
      console.log(response2);

      const data = await response2.json();
      await sendresendemail()
      console.log(data);
    } catch (error) {
      console.error("Error creating reservation:", error);
      addNotification("error", "Failed to make reservation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-4">
      <div>
        <Label htmlFor="dateTime">Date and Time</Label>
        <Input
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="partySize">Party Size</Label>
        <Input
          id="partySize"
          type="number"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Make Reservation</Button>
    </form>
  );
}
