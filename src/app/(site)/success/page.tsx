'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      fetchPaymentDetails(sessionId);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (sessionId: string) => {
    try {
      const response = await fetch('/api/get-payment-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment details');
      }

      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  if (!paymentDetails) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Amount paid: ${paymentDetails.amount_total / 100}</p>
      <p>Currency: {paymentDetails.currency}</p>
      <p>Payment status: {paymentDetails.payment_status}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SuccessPage;