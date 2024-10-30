"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Check, X, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

const AcceptDeclinePage = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const detailsParam = searchParams?.get("details");
  
  // Add pending state when status is null or undefined
  const getReservationState = () => {
    if (status === null || status === undefined) return "pending";
    return status === "true" ? "accepted" : "declined";
  };

  const reservationState = getReservationState();

  let reservationDetails = null;
  if (detailsParam) {
    try {
      reservationDetails = JSON.parse(decodeURIComponent(detailsParam));
    } catch (error) {
      console.error("Error parsing reservation details:", error);
    }
  }

  const formatDateForInput = (date: any) => {
    if (!date) return "";
    return format(date.toLocaleString(), "PPPpp");
  };

  const statusConfig = {
    accepted: {
      icon: <Check className="h-6 w-6 text-green-500" />,
      title: "Reservation Accepted",
      description: "Your reservation has been confirmed. Thank you for choosing our restaurant.",
      variant: "default" as const
    },
    pending: {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: "Reservation Pending",
      description: "Your reservation request has been received and is waiting for confirmation from the restaurant. We'll notify you once it's confirmed.",
      variant: "default" as const
    },
    declined: {
      icon: <X className="h-6 w-6 text-red-500" />,
      title: "Reservation Declined",
      description: "We're sorry, but your reservation has been declined.",
      variant: "destructive" as const
    }
  };

  const currentStatus = statusConfig[reservationState];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Alert 
          className={`mb-6 ${
            reservationState === 'pending' 
              ? 'border-yellow-500 bg-yellow-50 text-yellow-800' 
              : ''
          }`}
          variant={currentStatus.variant}
        >
          <div className="flex items-center space-x-2">
            {currentStatus.icon}
            <AlertTitle className={`text-lg font-semibold ${
              reservationState === 'pending' ? 'text-yellow-800' : ''
            }`}>
              {currentStatus.title}
            </AlertTitle>
          </div>
          <AlertDescription className={`mt-2 ${
            reservationState === 'pending' ? 'text-yellow-700' : ''
          }`}>
            {currentStatus.description}
          </AlertDescription>
        </Alert>

        {(reservationState === 'accepted' || reservationState === 'pending') && reservationDetails && (
          <div className="text-left">
            <h2 className="mb-4 text-2xl font-bold">Reservation Details</h2>
            <ul className="space-y-2">
              <li>
                <strong>Reservation ID:</strong> {reservationDetails.id}
              </li>
              <li>
                <strong>Date & Time:</strong>{" "}
                {reservationDetails.dateTime.toLocaleString()}
              </li>
              <li>
                <strong>Party Size:</strong> {reservationDetails.seats}
              </li>
              <li>
                <strong>Customer:</strong>{" "}
                {`${reservationDetails.firstName} ${reservationDetails.lastName}`}
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <span className={reservationState === 'pending' ? 'text-yellow-600 font-medium' : ''}>
                  {reservationState === 'pending' ? 'Awaiting Restaurant Confirmation' : reservationDetails.status}
                </span>
              </li>
              <li>
                <strong>Phone:</strong> {reservationDetails.countryCode}{" "}
                {reservationDetails.phoneNumber}
              </li>
              <li>
                <strong>Restaurant:</strong> {reservationDetails.restaurantName}
              </li>
              <li>
                <strong>Address:</strong> {reservationDetails.restaurantAddress}
              </li>
            </ul>
          </div>
        )}

        <div className="mt-6 text-center">
          {reservationState === 'pending' && (
            <p className="mb-4 text-sm text-yellow-600 font-medium">
              Please note: Your reservation request is being reviewed by the restaurant. 
              You will receive an WhatsApp notification once the restaurant confirms your reservation.
            </p>
          )}
        </div>
        <Link href="/" className=" underline text-blue-500 text-sm ml-8">Click here to go back to home</Link>
      </div>
    </div>
  );
};

export default AcceptDeclinePage;