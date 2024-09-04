"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Reservation } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/context/NotificationContext";
import toast from "react-hot-toast";

type ReservationWithUser = Reservation & {
  user: { name: string | null; email: string };
};

export const ReservationManagementContent = ({
  initialReservations,
  restaurantId,
}: {
  initialReservations: ReservationWithUser[];
  restaurantId: string;
}) => {
  const [reservations, setReservations] =
    useState<ReservationWithUser[]>(initialReservations);
  const { addNotification } = useNotification();

  const updateReservations = useCallback(
    (updatedReservation: ReservationWithUser) => {
      setReservations((prevReservations) => {
        const updatedReservations = prevReservations.map((res) =>
          res.id === updatedReservation.id ? updatedReservation : res,
        );
        console.log("Updated reservations:", updatedReservations);
        return updatedReservations;
      });
    },
    [],
  );

  const addNewReservation = useCallback(
    (newReservation: ReservationWithUser) => {
      setReservations((prevReservations) => {
        const updatedReservations = [...prevReservations, newReservation];
        console.log(
          "Updated reservations with new reservation:",
          updatedReservations,
        );
        return updatedReservations;
      });
    },
    [],
  );



  const handleStatusChange = async (
    reservationId: string,
    newStatus: "CONFIRMED" | "REJECTED",
  ) => {
    try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedReservation = await response.json();
      console.log("Reservation updated:", updatedReservation);

      updateReservations(updatedReservation);
      const response2 = await fetch("/api/usernoti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          reservationId: reservationId,
          title: "newReservation request",
          message: newStatus,
          link: "/dashboard/user",
        }),
      });
      console.log(response2);

      const data = await response2.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating reservation:", error);
      addNotification(
        "error",
        `Failed to ${newStatus.toLowerCase()} reservation. Please try again.`,
      );
    }
  };

  console.log("Rendering reservations:", reservations);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Pending Reservations</h2>
      <ul className="space-y-4">
        {reservations
          .filter((res) => res.status === "PENDING")
          .map((reservation) => (
            <li key={reservation.id} className="rounded border p-4 shadow">
              <p>Customer: {reservation.user.name}</p>
              <p>Email: {reservation.user.email}</p>
              <p>Date: {new Date(reservation.dateTime).toLocaleString()}</p>
              <p>Party Size: {reservation.partySize}</p>
              <div className="mt-2 space-x-2">
                <Button
                  onClick={() =>
                    handleStatusChange(reservation.id, "CONFIRMED")
                  }
                >
                  Confirm
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleStatusChange(reservation.id, "REJECTED")}
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};