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
  DrawerTrigger,
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
// import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import StarRating from "../Common/StarRating";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
// import { sendRestaurantWhatsapp } from "@/actions/sendrestaurantwhatsapp";
import restaurantsData from "@/utils/restaurants.json";
import { sendRestaurantWhatsapp2 } from "@/actions/sendrestaurantwhatsapp2";
import { sendrestaurantemail2 } from "@/actions/sendrestaurantemail2";
const { restaurants } = restaurantsData;

const MealType = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  APPETIZER: "Appetizer",
};

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

const RestaurantList = ({ restaurant }: { restaurant: any }) => {
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
    restaurantId: restaurant.id,
  });
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleReservationChange = (field: any, value: any) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleMakeReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation made:", reservationDetails);
    const result = await createFoodReservation(reservationDetails);
    console.log("wow",result);
    let reservationid;
    let reservationStatus
    if (result.success) {
      reservationid = result?.reservation?.id;
      reservationStatus= result?.reservation?.status;
    }
    // await sendRestaurantWhatsapp(
    //   reservationDetails.restaurantId,
    //   reservationDetails,
    //   reservationid,
    // reservationStatus)
    await sendRestaurantWhatsapp2(
      reservationDetails.restaurantId,
      reservationDetails,
      reservationid,
    reservationStatus)
    // await sendrestaurantemail(
    //   reservationDetails.restaurantId,
    //   reservationDetails,
    //   reservationid,
    // );
    await sendrestaurantemail2(
      reservationDetails.restaurantId,
      reservationDetails,
      reservationid,
    );
    setIsReservationOpen(false);
  };
  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:grid-cols-4 lg:pt-[160px]">
      <Card>
        <CardHeader>
          <Image
            src={restaurant.image[0]}
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
          <Drawer
            open={isReservationOpen}
            onOpenChange={setIsReservationOpen}
            onClose={() => setIsReservationOpen(false)}
          >
            <DrawerTrigger asChild>
              <div className="relative inline-block w-full">
                <Button className="w-full bg-yellow-400 text-black">
                  Reserve a table
                </Button>
                <span className="absolute -right-2 -top-2 rotate-12 transform rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                  10% OFF
                </span>
              </div>
            </DrawerTrigger>
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
                    <div className="flex pt-2">
                      {" "}
                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover> */}
                      <Input
                        id="time"
                        name="time"
                        type="datetime-local"
                        value={date.toISOString().slice(0, 16)}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        className="mt-1 hover:cursor-default"
                      />
                    </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

const RestaurantDetails = ({ params }: { params: { id: string } }) => {
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const menuRef = useRef<any>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Filter restaurants based on the mealType passed in the query parameter
  const filteredRestaurants = restaurants.filter((r) =>
    r.mealType.includes(params.id.toUpperCase()),
  );

  if (filteredRestaurants.length === 0) {
    return <div>No restaurants found for this meal type</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      <div className="" ref={menuRef}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {filteredRestaurants.map((restaurant, index) => (
            <Card key={index} className="cursor-pointer">
              <Link href={`/restaurants/${restaurant.id}/info`}>
                <CardContent className="p-2">
                  <Image
                    src={restaurant.image[0] || "/api/placeholder/200/200"}
                    alt={restaurant.name}
                    width={200}
                    height={200}
                    className="h-40 w-full rounded object-cover"
                  />
                  <h3 className="mt-2 font-semibold">{restaurant.name}</h3>
                  <div>
                    <StarRating rating={restaurant.rating} />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        {filteredRestaurants.length > 0 && (
          <Card className="relative my-4">
            <CardHeader className="px-3 py-2 text-xl font-bold">
              Recommended
            </CardHeader>
            <Link href={`/restaurants/${filteredRestaurants[0].id}/info`}>
              <CardContent className="relative flex h-full flex-col items-center justify-center p-2">
                <div className="relative h-72 w-full">
                  <Image
                    src={filteredRestaurants[0].image[0]}
                    alt={filteredRestaurants[0].name}
                    height={100}
                    width={200}
                    className="h-72 w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-lg bg-black opacity-40"></div>
                  <h3 className="absolute inset-0 flex flex-col-reverse items-start justify-start p-6 text-3xl font-bold text-white">
                    <div>
                      <StarRating rating={filteredRestaurants[0].rating} />
                    </div>
                    <div>{filteredRestaurants[0].name}</div>
                  </h3>
                </div>
              </CardContent>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export { RestaurantList, RestaurantDetails };
