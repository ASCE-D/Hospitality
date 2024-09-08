import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  reservationdetails:any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  reservationdetails,
}) => (
  <div>
    <h1>please handle the request, {firstName}! at /dashboard/restaurant {reservationdetails}</h1>
  </div>
);
