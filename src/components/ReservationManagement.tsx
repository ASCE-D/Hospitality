import { NotificationProvider } from "@/context/NotificationContext";

import { foodReservation, Reservation } from "@prisma/client";
import { ReservationManagementContent } from "./ReservationManagementContent";

type ReservationWithUser = foodReservation 

export default function ReservationManagement({
  reservations,
  restaurantId,
}: {
  reservations: ReservationWithUser[];
  restaurantId: string;
}) {
  return (
    <NotificationProvider>
      <ReservationManagementContent initialReservations={reservations} restaurantId={restaurantId} />
    </NotificationProvider>
  );
}
