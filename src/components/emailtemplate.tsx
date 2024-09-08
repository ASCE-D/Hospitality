import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  reservationdetails: any;
  reservationId: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  reservationdetails,
  reservationId,
}) => {
  // Format the date and time to a more readable format
  const formattedDateTime = new Date(reservationdetails.dateTime).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h2>Hello {firstName},</h2>
      <p>
        You have received a new reservation request. Here are the details:
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><strong>Name:</strong> {reservationdetails.firstName} {reservationdetails.lastName}</li>
        <li><strong>Phone Number:</strong> {reservationdetails.phoneNumber}</li>
        <li><strong>Meal Type:</strong> {reservationdetails.mealType}</li>
        <li><strong>Number of Seats: </strong> {reservationdetails.seats}</li>
        <li><strong>Date and Time:</strong> {formattedDateTime}</li>
      </ul>
      <p>
        Please <a href={`http://localhost:3000/dashboard/restaurant/${reservationId}`} style={{ color: '#1a73e8' }}>click here</a> to accept or decline the reservation request.
      </p>
      <p>Thank you!</p>
    </div>
  );
};
