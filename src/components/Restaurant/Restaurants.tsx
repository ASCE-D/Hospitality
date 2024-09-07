"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, CalendarIcon } from "lucide-react";
import Link from "next/link";
import ReservationDrawer from "./RestroDrawer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "@/components/Common/Datepicker";
import { sendresendemail } from "@/actions/sendemail";
import { sendMessage } from "@/actions/sendwhatsapp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createFoodReservation } from "@/actions/foodreservation";

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
        name: "Spaghetti Carbonara",
        price: "$14",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
      },
      {
        name: "Fettuccine Alfredo",
        price: "$13",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.BREAKFAST,
      },
      {
        name: "Lasagna",
        price: "$15",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.DINNER,
      },
      {
        name: "Classic Cheeseburger",
        price: "$10",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
      },
    ],
  },
  {
    id: 2,
    name: "Burger Bliss",
    image: "/placeholder/400/300",
    description: "Juicy burgers with a variety of toppings and sides.",
    rating: 4.3,
    address: "456 Oak Ave, Townsburg",
    phone: "+1 234-567-8901",
    hours: "11:00 AM - 11:00 PM",
    menu: [
      {
        name: "Classic Cheeseburger",
        price: "$10",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
      },
      {
        name: "Bacon Avocado Burger",
        price: "$12",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.LUNCH,
      },
      {
        name: "Veggie Burger",
        price: "$11",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: MealType.APPETIZER,
      },
    ],
  },
  // Add more restaurants as needed
];

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const RestaurantList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Local Restaurants</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardHeader>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-48 w-full rounded-t-lg object-cover"
              />
            </CardHeader>
            <CardContent>
              <h2 className="mb-2 text-xl font-semibold">{restaurant.name}</h2>
              <p className="mb-2 text-gray-600">{restaurant.description}</p>
              <div className="mb-2 flex items-center text-yellow-500">
                {Array(5)
                  .fill(3)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(restaurant.rating) ? "fill-current" : "fill-gray-300"}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                <span className="ml-1">{restaurant.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/restaurants/${restaurant.id}`} passHref>
                <Button className="w-full bg-yellow-400 text-black">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const RestaurantDetails = ({ params }: { params: { id: string } }) => {
  const [selectedMealType, setSelectedMealType] = useState<any>(null);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
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
    restaurantId: params.id,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const menuRef = useRef<any>(null);

  // Assuming you have a way to fetch the restaurant data based on the ID
  const restaurant = restaurants.find((r) => r.id === (params.id));

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const handleMealTypeSelect = (mealType: any) => {
    setSelectedMealType(mealType);
    setSelectedMeal(null);
    setReservationDetails(prev => ({
      ...prev,
      mealType: mealType
    }));
    // Scroll to the menu items after a short delay to ensure rendering is complete
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMealSelect = (meal: any) => {
    setSelectedMeal(meal);
    setReservationDetails(prev => ({
      ...prev,
      mealType: `${selectedMealType} - ${meal.name}`
    }));
    setIsReservationOpen(true);
  };

  const handleReservationChange = (field: any, value: any) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleMakeReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation made:", reservationDetails);
    await createFoodReservation(reservationDetails)
    setIsReservationOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // restaurantId,
          // dateTime,
          // partySize: parseInt(partySize),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      const newReservation = await response.json();
      console.log("Created reservation:", newReservation.reservation);
   
      const dateTime2: any = new Date(newReservation.reservation.dateTime);

      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Change to true if you prefer 12-hour format
      }).format(dateTime2);
      const response2 = await fetch("/api/restaurantnoti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          restaurantId: newReservation.reservation.restaurantId,
          title: "newReservation request",
          message: `Party size ${newReservation.reservation.partySize} on ${formattedDate}`,
          link: "/dashboard/restaurant",
        }),
      });
      console.log(response2);

      const data = await response2.json();
      await sendresendemail()
      await sendMessage()
      console.log(data);
    } catch (error) {
      console.error("Error creating reservation:", error);
      // addNotification("error", "Failed to make reservation. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      <Card>
        <CardHeader>
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={800}
            height={400}
            className="h-64 w-full rounded-t-lg object-cover"
          />
          <h1 className="mt-4 text-3xl font-bold">{restaurant.name}</h1>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">{restaurant.description}</p>
          <div className="mb-2 flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{restaurant.address}</span>
          </div>
          <div className="mb-2 flex items-center">
            <Phone size={16} className="mr-2" />
            <span>{restaurant.phone}</span>
          </div>
          <div className="mb-4 flex items-center">
            <Clock size={16} className="mr-2" />
            <span>{restaurant.hours}</span>
          </div>
          <h2 className="mb-4 text-2xl font-semibold">Select Meal Type</h2>
          <div className="mb-4 grid grid-cols-2 gap-4">
            {Object.values(MealType).map((mealType) => (
              <Button
                key={mealType}
                onClick={() => handleMealTypeSelect(mealType)}
                variant={selectedMealType === mealType ? "default" : "outline"}
              >
                {mealType}
              </Button>
            ))}
          </div>
        </CardContent>

        {selectedMealType && (
          <div className="p-4" ref={menuRef}>
            <h2 className="mb-4 text-2xl font-semibold">
              {selectedMealType} Menu
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {restaurant.menu
                .filter((item) => item.type === selectedMealType)
                .map((item, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleMealSelect(item)}
                  >
                    <CardContent className="p-2">
                      <Image
                        src={item.image[0] || "/api/placeholder/200/200"}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="h-40 w-full rounded object-cover"
                      />
                      <h3 className="mt-2 font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
        {!isDesktop && (
          <CardFooter>
            <ReservationDrawer restaurantName={restaurant.name} />
          </CardFooter>
        )}
      </Card>
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
                  value={
                    selectedMeal
                      ? `${selectedMealType} - ${selectedMeal.name}`
                      : ""
                  }
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
export { RestaurantList, RestaurantDetails };
