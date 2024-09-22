import { foodReservation, Reservation } from "@prisma/client";
import { ReservationManagementContent } from "./ReservationManagementContent";
import { TooltipProvider } from "./ui/tooltip";
import { getNotificationPreferences } from "@/actions/updatenotification";

type ReservationWithUser = foodReservation;

export default async function ReservationManagement({
  reservations,
  restaurantId,
}: {
  reservations: ReservationWithUser[];
  restaurantId: string;
}) {
  const notificationPreference = async () =>
    getNotificationPreferences(restaurantId);

  return (
    <TooltipProvider>
      <div className="w-full">
        {" "}
        <ReservationManagementContent
          initialReservations={reservations}
          restaurantId={restaurantId}
          notificationPreference={(await notificationPreference()).data as any}
        />
      </div>
    </TooltipProvider>
  );
}
