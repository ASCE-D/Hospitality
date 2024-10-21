'use client'

import React, { useState } from 'react';
import RestaurantSelector from '@/components/RestaurantSelector';
import MenuDisplay from '@/components/MenuDisplay';
import AddressForm from '@/components/AddressForm';
import { createDeliveryOrder } from '@/actions/delivery';
import OrderSummary from '@/components/ OrderSummary';


interface Restaurant {
  id: string;
  name: string;
  menu: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

const DeliveryPage: React.FC = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleAddToOrder = (menuItem: MenuItem) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...menuItem, quantity: 1 }];
    });
  };

  const handleRemoveFromOrder = (itemId: string) => {
    setOrderItems(prevItems => 
      prevItems.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as OrderItem[])
    );
  };

  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedRestaurant) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('restaurantId', selectedRestaurant.id);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('orderItems', JSON.stringify(orderItems));

    try {
      const result = await createDeliveryOrder(formData);

      if (result.success) {
        setOrderStatus('Order placed successfully!');
        // Reset form
        setSelectedRestaurant(null);
        setOrderItems([]);
        setName('');
        setAddress('');
        setPhoneNumber('');
      } else {
        setOrderStatus('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setOrderStatus('An unexpected error occurred. Please try again.');
    }
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Food Delivery</h1>
      
      {!selectedRestaurant ? (
        //@ts-ignore
        <RestaurantSelector onSelectRestaurant={setSelectedRestaurant} />
      ) : (
        <form onSubmit={handleSubmitOrder} className="space-y-8">
          <MenuDisplay 
            restaurant={selectedRestaurant} 
            onAddToOrder={handleAddToOrder} 
          />
          <OrderSummary
            items={orderItems}
            //@ts-ignore
            onRemoveItem={handleRemoveFromOrder}
            total={totalAmount}
          />
          <AddressForm 
            name={name}
            setName={setName}
            address={address} 
            setAddress={setAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={orderItems.length === 0 || !name || !address || !phoneNumber}
          >
            Place Order (${totalAmount.toFixed(2)})
          </button>
          {orderStatus && (
            <p className={`mt-4 text-center ${orderStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {orderStatus}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default DeliveryPage;