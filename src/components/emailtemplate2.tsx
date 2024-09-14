import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  reservationdetails: any;
  reservationId: string;
  acceptUrl: string;
  declineUrl: string;
}

export const EmailTemplate2: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  reservationdetails,
  reservationId,
  acceptUrl,
  declineUrl,
}) => {
  // Format the date and time to a more readable format
  const formattedDateTime = new Date(reservationdetails.dateTime).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h2>Hello {firstName},</h2>
      <p>You have received a new reservation request. Here are the details:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Name:</strong> {reservationdetails.firstName}{" "}
          {reservationdetails.lastName}
        </li>
        <li>
          <strong>Phone Number:</strong> {reservationdetails.phoneNumber}
        </li>
        <li>
          <strong>Meal Type:</strong> {reservationdetails.mealType}
        </li>
        <li>
          <strong>Number of Seats: </strong> {reservationdetails.seats}
        </li>
        <li>
          <strong>Date and Time:</strong> {formattedDateTime}
        </li>
      </ul>
      <p>Please use the links below to accept or decline the reservation:</p>
      <div style={{ margin: "20px 0" }}>
        <a
          href={acceptUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          Accept Reservation
        </a>
        <a
          href={declineUrl}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            textDecoration: "none",
          }}
        >
          Decline Reservation
        </a>
      </div>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Note: These links will only work if the reservation status is still
        pending. If you&apos;ve already taken action or the status has changed,
        please check your dashboard for the most up-to-date information.
      </p>
      <p>Thank you!</p>
    </div>
  );
};