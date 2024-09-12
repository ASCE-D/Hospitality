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
import { sendrestaurantemail } from "@/actions/sendrestaurantemail";
import StarRating from "../Common/StarRating";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { sendRestaurantWhatsapp } from "@/actions/sendrestaurantwhatsapp";

const MealType = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  DINNER: "Dinner",
  APPETIZER: "Appetizer",
};

const restaurants = [
  {
    id: "cm0zo7rsr000770zxzvmlfish",
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
    id: "cm0zob13u000b70zxbw6i45aa",
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
    id: "cm0zodb8c000f70zxhky2g5j8",
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
    id: "cm0zon70zxduqop35000cx0e2",
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
    await sendRestaurantWhatsapp(
      reservationDetails.restaurantId,
      reservationDetails,
      reservationid,
    reservationStatus)
    await sendrestaurantemail(
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
  const restaurant = restaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const handleMealTypeSelect = (mealType: any) => {
    setSelectedMealType(mealType);
    setSelectedMeal(null);
    setReservationDetails((prev) => ({
      ...prev,
      mealType: mealType,
    }));
    // Scroll to the menu items after a short delay to ensure rendering is complete
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMealSelect = (meal: any) => {
    setSelectedMeal(meal);
    setReservationDetails((prev) => ({
      ...prev,
      mealType: `${selectedMealType} - ${meal.name}`,
    }));
    setIsReservationOpen(true);
  };

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

    await sendrestaurantemail(
      reservationDetails.restaurantId,
      reservationDetails,
      reservationid,
    );
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
      await sendresendemail();
      await sendMessage();
      console.log(data);
    } catch (error) {
      console.error("Error creating reservation:", error);
      // addNotification("error", "Failed to make reservation. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      {/* <Card>
        <CardContent>
          <div className="py-4" ref={menuRef}>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {restaurant.menu.map((item, index) => (
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {!isDesktop && (
            <CardFooter>
              <ReservationDrawer restaurantName={restaurant.name} />
            </CardFooter>
          )}
        </CardContent>
      </Card> */}
      <div className="" ref={menuRef}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {restaurant.menu.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer"
              // onClick={() => handleMealSelect(item)}
            >
              <Link href={`/restaurants/${params.id}/info`}>
                {" "}
                <CardContent className="p-2">
                  <Image
                    src={item.image[0] || "/api/placeholder/200/200"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="h-40 w-full rounded object-cover"
                  />
                  <h3 className="mt-2 font-semibold">{item.name}</h3>
                  <div>
                    <StarRating rating={item.rating} />{" "}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <Card className="relative my-4">
          <CardHeader className="px-3 py-2 text-xl font-bold">
            Recommended
          </CardHeader>
          <Link href={`/restaurants/${params.id}/info`}>
            <CardContent className="relative flex h-full flex-col items-center justify-center p-2">
              {/* Image with opacity and black overlay */}
              <div className="relative h-72 w-full">
                <Image
                  src={restaurant.menu[0].image[0]}
                  alt={restaurant.menu[0].name}
                  height={100}
                  width={200}
                  className="h-72 w-full rounded-xl object-cover"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 rounded-lg bg-black opacity-40"></div>

                {/* Title on top of the image */}
                <h3 className="absolute inset-0 flex flex-col-reverse items-start justify-start p-6 text-3xl font-bold text-white">
                  <div>
                    <StarRating rating={restaurant.menu[0].rating} />{" "}
                  </div>
                  <div>{restaurant.menu[0].name}</div>
                </h3>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
      {/* {!isDesktop && <ReservationDrawer restaurantName={restaurant.name} />}
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
      </Drawer> */}
    </div>
  );
};
export { RestaurantList, RestaurantDetails };
