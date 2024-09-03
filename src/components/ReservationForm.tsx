"use client"
import { NotificationProvider } from "@/context/NotificationContext";
import ReservationFormContent from "./ReservationFormContent";

export default function ReservationForm({
  restaurantId,
}: {
  restaurantId: string;
}) {
  return (
    <NotificationProvider>
      <ReservationFormContent restaurantId={restaurantId} />
    </NotificationProvider>
  );
}
