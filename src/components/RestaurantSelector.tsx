'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getAllRestaurants } from '@/actions/restaurant';

export interface Restaurant {
  id: string;
  name: string;
  description: string | null;
  address: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

interface RestaurantSelectorProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

const RestaurantSelector: React.FC<RestaurantSelectorProps> = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data :any = await getAllRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to fetch restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="text-center">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <Card 
          key={restaurant.id} 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectRestaurant(restaurant)}
        >
          <CardHeader>{restaurant.name}</CardHeader>
          <CardContent>
            <p>{restaurant.description}</p>
            <p className="mt-2">Address: {restaurant.address}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantSelector;