'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AcceptDeclinePage = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status');
  const detailsParam = searchParams?.get('details');
  const isAccepted = status === 'true';

  let reservationDetails = null;
  if (detailsParam) {
    try {
      reservationDetails = JSON.parse(decodeURIComponent(detailsParam));
    } catch (error) {
      console.error('Error parsing reservation details:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <Alert
          className="mb-6"
          variant={isAccepted ? 'default' : 'destructive'}
        >
          <div className="flex items-center space-x-2">
            {isAccepted ? (
              <Check className="h-6 w-6 text-green-500" />
            ) : (
              <X className="h-6 w-6 text-red-500" />
            )}
            <AlertTitle className="text-lg font-semibold">
              {isAccepted ? 'Accepted' : 'Declined'}
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            {isAccepted
              ? 'Your reservation has been confirmed. Thank you for choosing our restaurant.'
              : 'We\'re sorry, but your reservation has been declined.'}
          </AlertDescription>
        </Alert>

        {isAccepted && reservationDetails && (
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
            <ul className="space-y-2">
              <li><strong>Reservation ID:</strong> {reservationDetails.id}</li>
              <li><strong>Date & Time:</strong> {new Date(reservationDetails.dateTime).toLocaleString()}</li>
              <li><strong>Party Size:</strong> {reservationDetails.seats}</li>
              <li><strong>Customer:</strong> {`${reservationDetails.firstName} ${reservationDetails.lastName}`}</li>
              <li><strong>Status:</strong> {reservationDetails.status}</li>
              <li><strong>Phone:</strong> {reservationDetails.phoneNumber}</li>
              <li><strong>Restaurant:</strong> {reservationDetails.restaurantName}</li>
              <li><strong>Address:</strong> {reservationDetails.restaurantAddress}</li>
            </ul>
          </div>
        )}

        <div className="mt-6 text-center">
          {/* <Button className="w-full">
            Return to Homepage
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AcceptDeclinePage;