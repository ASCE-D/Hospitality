"use client";

import { createFoodReservation } from "@/actions/foodreservation";
import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import { DatePicker } from "@/components/Common/Datepicker";
import {
  RestaurantDetails,
  RestaurantList,
} from "@/components/Restaurant/Restaurants";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import restaurantsData from "@/utils/restaurants.json";

const MealType = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  APPETIZER: "Appetizer",
};

const MenuItemPage = ({ params }: { params: { id: string } }) => {
    const searchParams = useSearchParams();
    const meal = searchParams?.get("meal");

  const { restaurants } = restaurantsData;
  const [selectedMealType, setSelectedMealType] = useState<any>(null);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+1",
    mealType: "",
    seats: "1",
    dateTime: new Date(),
    restaurantId: String,
  });
  const id = params.id;
  console.log(id);
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return <div>Restaurant not found</div>;


  const handleReservationChange = (field: any, value: any) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleMakeReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation made:", reservationDetails);
    const result = await createFoodReservation(reservationDetails);
    console.log(result);
    let reservationid;
    if (result.success) {
      reservationid = result?.reservation?.id;
    }

    await sendrestaurantemail(id as string, reservationDetails, reservationid);
    setIsReservationOpen(false);
  };

  return (
    <div>
      <RestaurantList restaurant={restaurant} meal={meal} />
    </div>
  );
};

export default MenuItemPage;
