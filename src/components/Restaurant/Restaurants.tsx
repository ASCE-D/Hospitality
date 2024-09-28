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
import { format, parseISO, set } from "date-fns";
import { useRouter } from "next/navigation";
import { createFoodReservation } from "@/actions/foodreservation";
// import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import StarRating from "../Common/StarRating";
// import { sendRestaurantWhatsapp } from "@/actions/sendrestaurantwhatsapp";
import restaurantsData from "@/utils/restaurants.json";
// import { sendRestaurantWhatsapp2 } from "@/actions/sendrestaurantwhatsapp2";
import { sendrestaurantemail2 } from "@/actions/sendrestaurantemail2";
import toast from "react-hot-toast";
import { ScrollArea } from "../ui/scroll-area";
import { sendRestaurantWhatsapp3 } from "@/actions/sendrestaurantwhatsapp3";
import { useSession } from "next-auth/react";
import { sendRestaurantEmail3 } from "@/actions/sendRestaurant3";
import CalendarBookingForm from "../DatePicker";
import Loader from "../Common/Loader";
const { restaurants } = restaurantsData;

type BookingPeriod = "LUNCH" | "DINNER";

const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+1", country: "Canada" },
  { code: "+7", country: "Russia" },
  { code: "+20", country: "Egypt" },
  { code: "+27", country: "South Africa" },
  { code: "+30", country: "Greece" },
  { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" },
  { code: "+33", country: "France" },
  { code: "+34", country: "Spain" },
  { code: "+36", country: "Hungary" },
  { code: "+39", country: "Italy" },
  { code: "+40", country: "Romania" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+44", country: "United Kingdom" },
  { code: "+45", country: "Denmark" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" },
  { code: "+49", country: "Germany" },
  { code: "+51", country: "Peru" },
  { code: "+52", country: "Mexico" },
  { code: "+54", country: "Argentina" },
  { code: "+55", country: "Brazil" },
  { code: "+56", country: "Chile" },
  { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" },
  { code: "+60", country: "Malaysia" },
  { code: "+61", country: "Australia" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+64", country: "New Zealand" },
  { code: "+65", country: "Singapore" },
  { code: "+66", country: "Thailand" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+84", country: "Vietnam" },
  { code: "+86", country: "China" },
  { code: "+90", country: "Turkey" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+93", country: "Afghanistan" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+98", country: "Iran" },
  { code: "+212", country: "Morocco" },
  { code: "+213", country: "Algeria" },
  { code: "+216", country: "Tunisia" },
  { code: "+218", country: "Libya" },
  { code: "+220", country: "Gambia" },
  { code: "+221", country: "Senegal" },
  { code: "+233", country: "Ghana" },
  { code: "+234", country: "Nigeria" },
  { code: "+254", country: "Kenya" },
  { code: "+255", country: "Tanzania" },
  { code: "+256", country: "Uganda" },
  { code: "+260", country: "Zambia" },
  { code: "+263", country: "Zimbabwe" },
  { code: "+351", country: "Portugal" },
  { code: "+352", country: "Luxembourg" },
  { code: "+353", country: "Ireland" },
  { code: "+354", country: "Iceland" },
  { code: "+355", country: "Albania" },
  { code: "+358", country: "Finland" },
  { code: "+359", country: "Bulgaria" },
  { code: "+370", country: "Lithuania" },
  { code: "+371", country: "Latvia" },
  { code: "+372", country: "Estonia" },
  { code: "+380", country: "Ukraine" },
  { code: "+381", country: "Serbia" },
  { code: "+385", country: "Croatia" },
  { code: "+386", country: "Slovenia" },
  { code: "+420", country: "Czech Republic" },
  { code: "+421", country: "Slovakia" },
  { code: "+509", country: "Haiti" },
  { code: "+593", country: "Ecuador" },
  { code: "+598", country: "Uruguay" },
  { code: "+852", country: "Hong Kong" },
  { code: "+855", country: "Cambodia" },
  { code: "+880", country: "Bangladesh" },
  { code: "+886", country: "Taiwan" },
  { code: "+960", country: "Maldives" },
  { code: "+962", country: "Jordan" },
  { code: "+964", country: "Iraq" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+972", country: "Israel" },
  { code: "+977", country: "Nepal" },
  { code: "+994", country: "Azerbaijan" },
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

const RestaurantList = ({
  restaurant,
  meal,
}: {
  restaurant: any;
  meal: any;
}) => {
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
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  type BookingPeriod = "LUNCH" | "DINNER";

  const handleReservationChange = (field: any, value: any) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      reservationDetails.firstName.trim() !== "" &&
      reservationDetails.lastName.trim() !== "" &&
      reservationDetails.phoneNumber.trim() !== ""
    );
  };

  const handleMakeReservation = async (e: any) => {
    e.preventDefault();

    const reservationToSend = { ...reservationDetails };

    // Convert the dateTime string to a Date object while preserving local time
    if (selectedDate) {
      reservationToSend.dateTime = selectedDate;

      console.log(
        "selectedDate: ",
        selectedDate,
        // "ISO string: ",
        // selectedDate.toISOString(),
      );
    }
    console.log("Reservation details to send:", reservationToSend);
    const result = await createFoodReservation(reservationToSend);

    console.log("wow", result);
    setLoading(false);
    let reservationid;
    let reservationStatus;
    if (result.success) {
      reservationid = result?.reservation?.id;
      reservationStatus = result?.reservation?.status;
      toast.success("You reservation request has been sent we'll inform you");

      // await sendRestaurantWhatsapp2(
      //   reservationDetails.restaurantId,
      //   reservationDetails,
      //   reservationid,
      //   reservationStatus,
      // );
      await sendRestaurantWhatsapp3(
        reservationDetails.restaurantId,
        reservationDetails,
        reservationid,
        reservationStatus,
      );
      await sendRestaurantEmail3(
        reservationDetails.restaurantId,
        reservationDetails,
        reservationid,
      );
      setIsReservationOpen(false);
      router.push("/restaurantreservationstatus");
    } else {
      toast.error("Please try again");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    setLoading(true);
    if (isFormValid()) {
      handleMakeReservation(e);
    } else {
      setLoading(false);
      toast.error(
        "Please enter your first name, last name, and phone number.",
        {
          duration: 3000,
          position: "bottom-center",
        },
      );
    }
  };

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const showReservationButton =
    restaurant.mealType.includes("DINNER") ||
    restaurant.mealType.includes("LUNCH");

  const contentRef = useRef<any>(null);

  useEffect(() => {
    // Prevent zooming
    const metaViewport = document.querySelector("meta[name=viewport]");
    const originalContent = metaViewport!.getAttribute("content");
    metaViewport!.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    );
    console.log("Date", selectedDate);

    // Handle keyboard appearance
    const handleFocus = () => {
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    };

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => input.addEventListener("focus", handleFocus));

    return () => {
      // Restore original viewport settings
      metaViewport!.setAttribute("content", originalContent as string);
      // Remove event listeners
      inputs.forEach((input) =>
        input.removeEventListener("focus", handleFocus),
      );
    };
  }, [selectedDate]);

  const formatDateForInput = (date: Date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <CalendarBookingForm
              restaurantId={restaurant.id}
              meal={meal.toUpperCase()}
              handleReservationChange={handleReservationChange}
              step={step}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <CalendarBookingForm
              restaurantId={restaurant.id}
              meal={meal.toUpperCase()}
              handleReservationChange={handleReservationChange}
              step={step}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={reservationDetails.firstName}
                  onChange={(e) =>
                    handleReservationChange("firstName", e.target.value)
                  }
                  required
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
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">WhatsApp Number</Label>
              <div className="grid grid-cols-3 gap-2">
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
                    <ScrollArea className="h-[400px] w-full">
                      {countryCodes.map(({ code, country }) => (
                        <SelectItem value={code} key={code}>
                          {code} ({country})
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <Input
                  className="col-span-2"
                  id="phoneNumber"
                  value={reservationDetails.phoneNumber}
                  onChange={(e) =>
                    handleReservationChange("phoneNumber", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              We&apos;ll use this number to send you notifications about your
              reservation.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reservation Summary</h3>
            <p>
              Date:{" "}
              {reservationDetails.dateTime
                ? format(reservationDetails.dateTime, "MMMM d, yyyy")
                : "Not selected"}
            </p>
            <p>
              Time:{" "}
              {(() => {
                const dateTimeString =
                  `${reservationDetails.dateTime}` || "Not selected";
                if (dateTimeString === "Not selected") return dateTimeString;

                const tIndex = dateTimeString.indexOf("T");
                const zIndex = dateTimeString.indexOf("Z");

                if (tIndex !== -1 && zIndex !== -1) {
                  const fullTime = dateTimeString.substring(tIndex + 1, zIndex);
                  return fullTime.substring(0, 5); // This will return only the hours and minutes
                }

                return "Invalid format";
              })()}
            </p>
            <p>Seats: {reservationDetails.seats || "Not selected"}</p>
            <p>
              Name:{" "}
              {`${reservationDetails.firstName} ${reservationDetails.lastName}`}
            </p>
            <p>
              Contact:{" "}
              {`${reservationDetails.countryCode} ${reservationDetails.phoneNumber}`}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

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
          {!showReservationButton && (
            <Link href={restaurant.location}>
              <div className="mb-2 flex items-center underline ">
                {" "}
                <MapPin size={28} className="mr-2" />
                <span className="text-blue-500">{restaurant.address}</span>
              </div>
            </Link>
          )}
          <div className="mb-4 flex items-center">
            <Clock size={24} className="mr-2" />
            <span>{restaurant.hours}</span>
          </div>
          {!showReservationButton && restaurant.phone !== "" && (
            <div className="mb-4 flex items-center">
              <Phone size={24} className="mr-2" />
              <span>{restaurant.phone}</span>
            </div>
          )}
          {restaurant.notes !== "" && <Label>{restaurant.notes} </Label>}
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
          <DialogContent className="h-screen sm:max-w-[425px]">
            <DialogHeader className="flex">
              <DialogTitle>Make a Reservation</DialogTitle>
              <Image
                src={restaurant.image[0]}
                alt={restaurant.name}
                width={100}
                height={100}
                className="mb-6 h-24 w-full rounded-lg object-cover"
              />
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStepContent()}
              <DialogFooter>
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="my-2"
                  >
                    Back
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  //   <Button type="button" onClick={handleSubmit} className="bg-yellow-400 text-black hover:bg-white" >
                  //   Book Now
                  // </Button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting ? "Booking..." : "Book Now"}{" "}
                    {loading && <Loader />}
                  </button>
                )}
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
                <Link
                  href={`/restaurants/${restaurant.id}/info?meal=${params.id}`}
                >
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
            <Link
              href={`/restaurants/${recommendedRestaurant.id}/info?meal=${params.id}`}
            >
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
