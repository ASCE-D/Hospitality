import { NotificationProvider } from "@/context/NotificationContext";

import { Reservation } from "@prisma/client";
import { ReservationManagementContent } from "./ReservationManagementContent";

type ReservationWithUser = Reservation & {
  user: { name: string|null; email: string };
};

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
