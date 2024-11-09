import React from 'react';
import { Clock, Check, CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ReservationPendingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-orange-600">
            Reservation Request Received
          </CardTitle>
          <CardDescription className="text-center">
            Your booking is pending confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-orange-100 p-3">
              <Clock className="h-8 w-8 animate-pulse text-orange-600" />
            </div>
          </div>

          {/* Timeline */}
          <div className="relative mb-6">
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200" />

            <div className="relative mb-8 flex items-center">
              <div className="flex-1 pr-4 text-right">
                <h3 className="font-medium">Request Submitted</h3>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
              <div className="z-10 rounded-full bg-green-500 p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1" />
            </div>

            <div className="relative mb-8 flex items-center">
              <div className="flex-1 pr-4 text-right">
                <h3 className="font-medium text-orange-600">
                  Awaiting Confirmation
                </h3>
                <p className="text-sm text-gray-500">In progress</p>
              </div>
              <div className="z-10 rounded-full bg-orange-500 p-1">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1" />
            </div>

            <div className="relative flex items-center opacity-50">
              <div className="flex-1 pr-4 text-right">
                <h3 className="font-medium">Reservation Confirmed</h3>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="z-10 rounded-full bg-gray-300 p-1">
                <CalendarDays className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1" />
            </div>
          </div>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertTitle className="text-orange-800">
              What happens next?
            </AlertTitle>
            <AlertDescription className="text-orange-700">
              We&apos;re reviewing your request and will send a confirmation
              message to your WhatsApp within 24 hours.
            </AlertDescription>
          </Alert>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p className="text-center">
              Your requested reservation details will be reviewed by our team.
            </p>
            <p className="text-center font-medium">
              Need to make changes? Contact us right away.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationPendingPage;