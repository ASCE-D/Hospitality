"use client"

import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, X } from "lucide-react";

const StripePaymentResponse = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams?.get("session_id");

    if (sessionId) {
      fetchPaymentDetails(sessionId);
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (sessionId: string) => {
    try {
      const response = await fetch("/api/get-payment-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payment details");
      }

      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
          Loading payment details...
        </div>
      </div>
    );
  }

  const isSuccess = paymentDetails && paymentDetails.payment_status === "paid";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Alert className="mb-6" variant={isSuccess ? "default" : "destructive"}>
          <div className="flex items-center space-x-2">
            {isSuccess ? (
              <Check className="h-6 w-6 text-green-500" />
            ) : (
              <X className="h-6 w-6 text-red-500" />
            )}
            <AlertTitle className="text-lg font-semibold">
              {isSuccess ? "Payment Successful" : "Payment Failed"}
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            {isSuccess
              ? "Your payment has been processed successfully."
              : "We're sorry, but there was an issue processing your payment."}
          </AlertDescription>
        </Alert>

        {paymentDetails && (
          <div className="text-left">
            <h2 className="mb-4 text-2xl font-bold">Payment Details</h2>
            <ul className="space-y-2">
              <li>
                <strong>Amount:</strong> ${paymentDetails.amount_total / 100}
              </li>
              <li>
                <strong>Currency:</strong>{" "}
                {paymentDetails.currency.toUpperCase()}
              </li>
              <li>
                <strong>Status:</strong> {paymentDetails.payment_status}
              </li>
              <li>
                <strong>Date:</strong>{" "}
                {new Date(paymentDetails.created * 1000).toLocaleString()}
              </li>
              {paymentDetails.customer_details && (
                <>
                  <li>
                    <strong>Customer:</strong>{" "}
                    {paymentDetails.customer_details.name}
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    {paymentDetails.customer_details.email}
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        <div className="mt-6 text-center">
          {/* You can add a button here to return to the homepage or perform another action */}
          {/* <Button className="w-full">Return to Homepage</Button> */}
        </div>
      </div>
    </div>
  );
};

export default StripePaymentResponse;
