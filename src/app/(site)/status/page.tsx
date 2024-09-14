'use client'
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AcceptDeclinePage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const isAccepted = status === 'true';

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
              ? 'Your request has been accepted. Thank you for your participation.'
              : 'We\'re sorry, but your request has been declined.'}
          </AlertDescription>
        </Alert>

        {/* <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isAccepted ? 'Welcome Aboard!' : 'Thank You for Your Interest'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isAccepted
              ? 'We\'re excited to have you join us. Here\'s what you can expect next:'
              : 'We appreciate your interest. While we couldn\'t proceed with your request at this time, we encourage you to:'}
          </p>
          <ul className="list-disc text-left pl-6 mb-6">
            {isAccepted ? (
              <>
                <li>Check your email for further instructions</li>
                <li>Complete any required paperwork</li>
                <li>Attend the upcoming orientation session</li>
              </>
            ) : (
              <>
                <li>Review our criteria for future opportunities</li>
                <li>Explore other options on our website</li>
                <li>Sign up for our newsletter to stay informed</li>
              </>
            )}
          </ul>
          <Button className="w-full">
            {isAccepted ? 'Get Started' : 'Return to Homepage'}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default AcceptDeclinePage;