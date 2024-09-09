"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RestaurantList } from "@/components/Restaurant/Restaurants";
import Link from "next/link";

const FoodOptionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const foodOptions = [
    { id: 3, title: "Breakfast", discount: false },
    { id: 4, title: "Lunch", discount: false },
    { id: 5, title: "Dinner", discount: true },
    { id: 6, title: "Appetizer", discount: false },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Food Options</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {foodOptions.map((option) => (
          <Card key={option.title} className="w-full">
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Explore our {option.title.toLowerCase()} menu</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/restaurants/cm0ner3ks0003htvdm9zzhwy${option.id}`}
                className="w-full justify-center"
              >
                {" "}
                <Button variant="outline" className="w-full">
                  {option.title == "Dinner"
                    ? "10% off - View Menu"
                    : "View Menu"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FoodOptionsPage;
