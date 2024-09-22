"use client";
import ReservationFormContent from "./ReservationFormContent";

export default function ReservationForm({
  restaurantId,
}: {
  restaurantId: string;
}) {
  return <ReservationFormContent restaurantId={restaurantId} />;
}
