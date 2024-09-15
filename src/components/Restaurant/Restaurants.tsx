"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, CalendarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/Common/Datepicker";
import { sendresendemail } from "@/actions/sendemail";
import { sendMessage } from "@/actions/sendwhatsapp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createFoodReservation } from "@/actions/foodreservation";
// import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import StarRating from "../Common/StarRating";
// import { sendRestaurantWhatsapp } from "@/actions/sendrestaurantwhatsapp";
import restaurantsData from "@/utils/restaurants.json";
import { sendRestaurantWhatsapp2 } from "@/actions/sendrestaurantwhatsapp2";
import { sendrestaurantemail2 } from "@/actions/sendrestaurantemail2";
import toast from "react-hot-toast";
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
    seats: 1,
    dateTime: new Date(),
    restaurantId: restaurant.id,
  });
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter()
  const handleReservationChange = (field: any, value: any) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleMakeReservation = async (e: any) => {
    e.preventDefault();
    console.log("Reservation made:", reservationDetails);
    const result = await createFoodReservation(reservationDetails);
    console.log("wow", result);
    let reservationid;
    let reservationStatus;
    if (result.success) {
      reservationid = result?.reservation?.id;
      reservationStatus = result?.reservation?.status;
      toast.success("You reservation request has been sent we'll inform you");
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
      reservationStatus,
    );
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
    router.push("/restaurantreservationstatus")

  };

  const showReservationButton =
    restaurant.mealType.includes("DINNER") ||
    restaurant.mealType.includes("LUNCH");

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <Image
            src={restaurant.image[0]}
            alt={restaurant.name}
            width={800}
            height={400}
            className="mb-6 h-72 w-full rounded-lg object-cover"
          />
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-600">{restaurant.description}</p>
          <Link href={restaurant.location}>
            <div className="mb-2 flex items-center underline ">
              {" "}
              <MapPin size={28} className="mr-2" />
              <span className="text-blue-500">{restaurant.address}</span>
            </div>
          </Link>
          <div className="mb-4 flex items-center">
            <Clock size={16} className="mr-2" />
            <span>{restaurant.hours}</span>
          </div>
        </CardContent>
        {showReservationButton && (
          <CardFooter>
            <Button
              onClick={() => setIsReservationOpen(true)}
              className="w-full bg-yellow-400 text-black"
            >
              Reserve a table now
            </Button>
          </CardFooter>
        )}
      </Card>
      {showReservationButton && (
        <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Make a Reservation</DialogTitle>
              <DialogDescription>
                Reserve a table at {restaurant.name}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleMakeReservation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={reservationDetails.firstName}
                    onChange={(e) =>
                      handleReservationChange("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
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
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
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
                      <SelectItem value="+91">+91 (India)</SelectItem>
                      <SelectItem value="+86">+86 (China)</SelectItem>
                      <SelectItem value="+81">+81 (Japan)</SelectItem>
                      <SelectItem value="+49">+49 (Germany)</SelectItem>
                      <SelectItem value="+33">+33 (France)</SelectItem>
                      <SelectItem value="+7">+7 (Russia)</SelectItem>
                      <SelectItem value="+55">+55 (Brazil)</SelectItem>
                      <SelectItem value="+61">+61 (Australia)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
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
              <div className="space-y-2">
                <Label htmlFor="seats">Number of Seats</Label>
                <Select
                  value={`${reservationDetails.seats}`}
                  onValueChange={(value) =>
                    handleReservationChange("seats", value)
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
              <div className="space-y-2">
                <Label htmlFor="dateTime">Select Date and Time</Label>
                <Input
                  id="dateTime"
                  type="datetime-local"
                  value={
                    reservationDetails.dateTime
                      ? reservationDetails.dateTime.toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    handleReservationChange(
                      "dateTime",
                      new Date(e.target.value),
                    )
                  }
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-yellow-400 text-black">
                  Submit Reservation
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
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

  const recommendedRestaurant = filteredRestaurants.find((r) => r.recommended);

  if (filteredRestaurants.length === 0) {
    return <div>No restaurants found for this meal type</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="" ref={menuRef}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {filteredRestaurants
            .filter((r) => !r.recommended)
            .map((restaurant, index) => (
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
        {recommendedRestaurant && (
          <Card className="relative my-4">
            <CardHeader className="px-3 py-2 text-xl font-bold">
              Recommended
            </CardHeader>
            <Link href={`/restaurants/${recommendedRestaurant.id}/info`}>
              <CardContent className="relative flex h-full flex-col items-center justify-center p-2">
                <div className="relative h-72 w-full">
                  <Image
                    src={recommendedRestaurant.image[0]}
                    alt={recommendedRestaurant.name}
                    height={100}
                    width={200}
                    className="h-72 w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-lg bg-black opacity-40"></div>
                  <h3 className="absolute inset-0 flex flex-col-reverse items-start justify-start p-6 text-3xl font-bold text-white">
                    <div>
                      <StarRating rating={recommendedRestaurant.rating} />
                    </div>
                    <div>{recommendedRestaurant.name}</div>
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
