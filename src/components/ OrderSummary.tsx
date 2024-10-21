import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="mt-8">
      <CardHeader>
        <h2 className="text-2xl font-bold">Order Summary</h2>
      </CardHeader>
      <CardContent>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;