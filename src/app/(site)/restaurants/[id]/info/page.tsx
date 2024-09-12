"use client";

import { createFoodReservation } from "@/actions/foodreservation";
import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import { DatePicker } from "@/components/Common/Datepicker";
import {
  RestaurantDetails,
  RestaurantList,
} from "@/components/Restaurant/Restaurants";
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
    name: "Josna Ristorante Indiano",
    image: [
      "/images/restaurants/josna/1.jpg",
      "/images/restaurants/josna/2.jpg",
      "/images/restaurants/josna/3.jpg",
      "/images/restaurants/josna/4.jpg",
    ],
    description: "Authentic Italian pasta dishes in a cozy atmosphere.",
    rating: 4.5,
    address:
      "Via di Porta Soprana 31R From Piazza de Ferrari the backdrop is between the Palazzo del Regione Liguria and the headquarters of Banca Unicredit., 16123, Genoa Italy",
    location:
      "https://maps.google.com/maps?saddr=&daddr=Via%20di%20Porta%20Soprana%2031R%20From%20Piazza%20de%20Ferrari%20the%20backdrop%20is%20between%20the%20Palazzo%20del%20Regione%20Liguria%20and%20the%20headquarters%20of%20Banca%20Unicredit.,%2016123,%20Genoa%20Italy@44.406246,8.93323",
    phone: "+39 328 868 5641",
    hours: "12:30 pm - 2:30 pm--7:00 pm - 11:00 pm",
    menu: [
      {
        name: "Penne Arrabbiata",
        price: "Medium",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: "LUNCH",
        rating: 4.8,
      },
      {
        name: "Gnocchi al Pesto",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: "LUNCH",
        rating: 4.5,
      },
      {
        name: "Four-Cheese Lasagna",
        price: "Luxury",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: "LUNCH",
        rating: 4.7,
      },
      {
        name: "Grilled Chicken Panini",
        price: "Economy",
        image: ["/images/restaurants/menu/sughi-speciali-del-giorno.jpg"],
        type: "LUNCH",
        rating: 4.1,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy4",
    name: "E. Prie Rosse",
    image: [
      "/images/restaurants/rosse/1.jpg",
      "/images/restaurants/rosse/2.jpg",
      "/images/restaurants/rosse/3.jpg",
      "/images/restaurants/rosse/4.jpg",
    ],
    description:
      "Traditional Italian cuisine with an emphasis on fresh, local ingredients.",
    rating: 4.6,
    address: "56 R Via di Ravecca 54, 16128, Genoa Italy",
    location:
      "https://maps.google.com/maps?saddr=&daddr=56%20R%20Via%20di%20Ravecca%2054,%2016128,%20Genoa%20Italy@44.40485,8.933568",
    phone: "+39 3457164046 / +39 3482991686 / +39 347 4295460",
    hours: "12:30 pm - 2:30 pm -- 7:30 pm - 11:00 pm",
    menu: [
      {
        name: "Ravioli al Pesto",
        price: "Luxury",
        image: ["/images/restaurants/menu/ravioli.jpg"],
        type: "LUNCH",
        rating: 4.7,
      },
      {
        name: "Tagliatelle al Ragu",
        price: "Medium",
        image: ["/images/restaurants/menu/tagliatelle.jpg"],
        type: "LUNCH",
        rating: 4.5,
      },
      {
        name: "Seafood Risotto",
        price: "Luxury",
        image: ["/images/restaurants/menu/risotto.jpg"],
        type: "DINNER",
        rating: 4.8,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy5",
    name: "Osteria Le Colonne",
    image: [
      "/images/restaurants/colonne/1.jpg",
      "/images/restaurants/colonne/2.jpg",
    ],
    description:
      "Modern Italian dining experience with a creative twist on classic dishes.",
    rating: 4.7,
    address: "Piazza Invrea 3R, 16129, Genova Italia",
    location:
      "https://maps.google.com/maps?saddr=&daddr=Piazza%20Invrea%203R,%2016129,%20Genova%20Italia@44.408283,8.930823",
    phone: "+39 010 292 7649",
    hours: "12:15-02:30 PM -- 07:15-10:30 PM",
    menu: [
      {
        name: "Carbonara Moderna",
        price: "Luxury",
        image: ["/images/restaurants/menu/carbonara.jpg"],
        type: "DINNER",
        rating: 4.9,
      },
      {
        name: "Tiramisu Tradizionale",
        price: "Economy",
        image: ["/images/restaurants/menu/tiramisu.jpg"],
        type: "DESSERT",
        rating: 4.8,
      },
    ],
  },
  {
    id: "cm0ner3ks0003htvdm9zzhwy6",
    name: "Broadside Sushi Genova",
    images: [
      "/images/restaurants/sushi/1.jpg",
      "/images/restaurants/sushi/2.jpg",
    ],
    description:
      "Fusion sushi with a unique blend of Italian and Japanese flavors.",
    rating: 4.8,
    address: "Via 12 Ottobre, 27, 16121, Genova Italia",
    location:
      "https://maps.google.com/maps?saddr=&daddr=Via%2012%20Ottobre,%2027,%2016121,%20Genova%20Italia@44.408344,8.937496",
    phone: "+39 340 6201419",
    hours: "12:00-15:00 -- 19:00-23:59",
    menu: [
      {
        name: "Tuna Tataki",
        price: "Luxury",
        image: ["/images/restaurants/menu/tuna-tataki.jpg"],
        type: "DINNER",
        rating: 4.7,
      },
      {
        name: "Salmon Sashimi",
        price: "Medium",
        image: ["/images/restaurants/menu/salmon-sashimi.jpg"],
        type: "DINNER",
        rating: 4.6,
      },
      {
        name: "Matcha Mochi Ice Cream",
        price: "Economy",
        image: ["/images/restaurants/menu/matcha-mochi.jpg"],
        type: "DESSERT",
        rating: 4.5,
      },
    ],
  },
];

const MenuItemPage = ({ params }: { params: { id: string } }) => {
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
      <RestaurantList restaurant={restaurant} />
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
