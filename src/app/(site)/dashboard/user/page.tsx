"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";

type ReservationWithRestaurant = Reservation & { restaurant: { name: string } };

export default function UserDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState<ReservationWithRestaurant[]>(
    [],
  );

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/reservations?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setReservations(data.reservations));
    }
  }, [session]);


  if (!session) {
    return null;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Your Reservations</h1>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="rounded border p-4 shadow">
              <h2 className="text-xl font-semibold">
                {reservation.restaurant.name}
              </h2>
              <p>Date: {new Date(reservation.dateTime).toLocaleString()}</p>
              <p>Party Size: {reservation.partySize}</p>
              <p>Status: {reservation.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
