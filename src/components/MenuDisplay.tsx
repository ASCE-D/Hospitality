import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  menu: MenuItem[];
}

interface MenuDisplayProps {
  restaurant: Restaurant;
  onAddToOrder: (item: MenuItem) => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ restaurant, onAddToOrder }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{restaurant.name} Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurant.menu.map((item) => (
          <Card key={item.id}>
            <CardHeader>{item.name}</CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <p className="mt-2 font-bold">Price: ${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onAddToOrder(item)}>Add to Order</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;