"use client";

import { createFoodReservation } from "@/actions/foodreservation";
import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import { DatePicker } from "@/components/Common/Datepicker";
import { RestaurantDetails, RestaurantList } from "@/components/Restaurant/Restaurants";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const MealType = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  APPETIZER: "Appetizer",
};

const restaurants = [
  {
    id: "cm0ner3ks0003htvdm9zzhwy3",
    name: "Pasta Paradise",
    image: "/placeholder/400/300",
    description: "Authentic Italian pasta dishes in a cozy atmosphere.",
    rating: 4.5,
    address: "123 Main St, Cityville",
    phone: "+1 234-567-8900",
    hours: "11:00 AM - 10:00 PM",
    menu: [
      {
        name: "Penne Arrabbiata",
        price: "Medium",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.8,
      },
      {
        name: "Gnocchi al Pesto",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.5,
      },
      {
        name: "Four-Cheese Lasagna",
        price: "Luxury",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.7,
      },
      {
        name: "Grilled Chicken Panini",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.1,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy4",
    name: "Burger Bliss",
    image: "/placeholder/400/300",
    description: "Juicy burgers with a variety of toppings and sides.",
    rating: 4.3,
    address: "456 Oak Ave, Townsburg",
    phone: "+1 234-567-8901",
    hours: "11:00 AM - 11:00 PM",
    menu: [
      {
        name: "Smoky BBQ Burger",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.2,
      },
      {
        name: "Truffle Mushroom Burger",
        price: "Medium",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.6,
      },
      {
        name: "Spicy Black Bean Burger",
        price: "Luxury",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
        rating: 4.5,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy5",
    name: "Burger Bliss",
    image: "/placeholder/400/300",
    description: "Juicy burgers with a variety of toppings and sides.",
    rating: 4.3,
    address: "456 Oak Ave, Townsburg",
    phone: "+1 234-567-8901",
    hours: "11:00 AM - 11:00 PM",
    menu: [
      {
        name: "Chipotle Chicken Burger",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.DINNER,
        rating: 4.3,
      },
      {
        name: "Bacon Swiss Burger",
        price: "Medium",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.DINNER,
        rating: 4.7,
      },
      {
        name: "Vegan Quinoa Burger",
        price: "Luxury",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.DINNER,
        rating: 4.6,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy6",
    name: "Burger Bliss",
    image: "/placeholder/400/300",
    description: "Juicy burgers with a variety of toppings and sides.",
    rating: 4.3,
    address: "456 Oak Ave, Townsburg",
    phone: "+1 234-567-8901",
    hours: "11:00 AM - 11:00 PM",
    menu: [
      {
        name: "Buffalo Chicken Sliders",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
        rating: 4.2,
      },
      {
        name: "Loaded Nacho Burger",
        price: "Medium",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
        rating: 4.5,
      },
      {
        name: "Crispy Portobello Burger",
        price: "Luxury",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
        rating: 4.4,
      },
    ],
  },
];

const MenuItemPage = ({
  params,
}: {
  params: { id: string };
}) => {
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
  const id = params.id
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
      <RestaurantList restaurant= {restaurant} />
      <Drawer
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Make a Reservation</DrawerTitle>
            <DrawerDescription>
              Reserve a table at {restaurant.name}
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleMakeReservation} className="p-4">
            <div className="px-4">
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={reservationDetails.firstName}
                    onChange={(e) =>
                      handleReservationChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={reservationDetails.lastName}
                    onChange={(e) =>
                      handleReservationChange("lastName", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={reservationDetails.email}
                  onChange={(e) =>
                    handleReservationChange("email", e.target.value)
                  }
                />
              </div>
              <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="countryCode">Country Code</Label>
                  <Select
                    value={reservationDetails.countryCode}
                    onValueChange={(value) =>
                      handleReservationChange("countryCode", value)
                    }
                  >
                    <SelectTrigger id="countryCode">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1 (US)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                      {/* Add more country codes as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={reservationDetails.phoneNumber}
                    onChange={(e) =>
                      handleReservationChange("phoneNumber", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="mealType">Meal Type</Label>
                <Input
                  id="mealType"
                  value={selectedMeal ? `${selectedMeal.name}` : ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="seats">Number of Seats</Label>
                <Select
                  value={reservationDetails.seats}
                  onValueChange={(value) =>
                    handleReservationChange("seats", parseInt(value, 10))
                  }
                >
                  <SelectTrigger id="seats">
                    <SelectValue placeholder="Select seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <Label>Select Date</Label>
                <DatePicker
                  selected={reservationDetails.dateTime}
                  onSelect={(date) => handleReservationChange("date", date)}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit" className="bg-yellow-400 text-black">
                Submit Reservation
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MenuItemPage;
