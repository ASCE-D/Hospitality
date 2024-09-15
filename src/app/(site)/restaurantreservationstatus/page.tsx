'use client'
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ReservationConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-600">
            Booking Request Successful!
          </CardTitle>
          <CardDescription className="text-center">
            Your reservation has been received
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <Alert>
            <AlertTitle>Confirmation on the way</AlertTitle>
            <AlertDescription>
              A confirmation message will be sent to your WhatsApp shortly.
            </AlertDescription>
          </Alert>
          <p className="mt-6 text-center text-sm text-gray-600">
            Thank you for choosing our service. If you have any questions, please don't hesitate to contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationConfirmationPage;