import React from "react";
import {
  Star,
  MapPin,
  ThumbsUp,
  Activity,
  Phone,
  Mail,
  Wifi,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

const hotels = [
  {
    id: 0,
    name: "Josna Ristorante Indiano",
    image: "api/placeholder/400/300",
    description:
      "Experience ultimate relaxation in our 5-star resort with breathtaking ocean views.",
    price: "$299",
    rating: 4.8,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "Tmhbc.bom@tajhotels.com", phone: "022 6665 3366" },
    images: ["/images/restaurants/service-1.jpg"],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
    wifi: {
      networkName: "WIFI-Cartai",
      password: "123456789O",
    },
    houseRules: [
      "No smoking inside the property.",
      "No parties or events.",
      "No unregistered guests.",
      "Noise and the neighbourhood please be considerate",
    ],
    checkOut: {
      time: "10 Am",
      instructions: [
        "Please leave unit as found.",
        "Dishes places in dishwasher",
        "Towel left on bathroom floor",
        "Turn off lights",
        "Close all windows",
        "Lock doors",
        "Notify host of departure",
      ],
    },
  },
  {
    id: 1,
    name: "E. Prie Rosse",
    image: "/api/placeholder/400/300",
    description:
      "Stay in the heart of the city, walking distance from major attractions and business centers.",
    price: "$189",
    rating: 4.5,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "", phone: "" },
    images: ["/images/restaurants/service-1.jpg"],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
    wifi: {
      networkName: "WIFI-Cartai",
      password: "123456789O",
    },
    houseRules: [
      "No smoking inside the property.",
      "No parties or events.",
      "No unregistered guests.",
      "Noise and the neighbourhood please be considerate",
    ],
    checkOut: {
      time: "11am",
      instructions: [
        "Please leave unit as found.",
        "Dishes places in dishwasher",
        "Towel left on bathroom floor",
        "Turn off lights",
        "Close all windows",
        "Lock doors",
        "Notify host of departure",
      ],
    },
  },
  {
    id: 2,
    name: "Osteria Le Colonne",
    image: "/api/placeholder/400/300",
    description:
      "Escape to nature in our cozy lodge surrounded by stunning mountain landscapes.",
    price: "$159",
    rating: 4.6,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "", phone: "" },
    images: ["/images/restaurants/service-1.jpg"],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
    wifi: {
      networkName: "WIFI-Cartai",
      password: "123456789O",
    },
    houseRules: [
      "No smoking inside the property.",
      "No parties or events.",
      "No unregistered guests.",
      "Noise and the neighbourhood please be considerate",
    ],
    checkOut: {
      time: "11am",
      instructions: [
        "Please leave unit as found.",
        "Dishes places in dishwasher",
        "Towel left on bathroom floor",
        "Turn off lights",
        "Close all windows",
        "Lock doors",
        "Notify host of departure",
      ],
    },
  },
  {
    id: 3,
    name: "Broadside Sushi Genova",
    image: "/placeholder/400/300",
    description:
      "Wake up to the sound of waves in our private beachfront bungalows.",
    price: "$229",
    rating: 4.7,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "", phone: "" },
    images: ["/images/restaurants/service-1.jpg"],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
    wifi: {
      networkName: "WIFI-Cartai",
      password: "123456789O",
    },
    houseRules: [
      "No smoking inside the property.",
      "No parties or events.",
      "No unregistered guests.",
      "Noise and the neighbourhood please be considerate",
    ],
    checkOut: {
      time: "11am",
      instructions: [
        "Please leave unit as found.",
        "Dishes places in dishwasher",
        "Towel left on bathroom floor",
        "Turn off lights",
        "Close all windows",
        "Lock doors",
        "Notify host of departure",
      ],
    },
  },
];

const HotelReviewMobile = () => {
  const t = useTranslations("hotelReviewMobile");

  const hotel = hotels[0];

  return (
    <div className="container mx-auto p-4 pt-[80px] md:pt-[130px] lg:grid-cols-4 lg:pt-[160px]">
      <Card>
        <CardHeader>
          <h1 className="mb-2 text-2xl font-bold">{hotel.name}</h1>
          <div className="mb-2 flex items-center">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm text-gray-500">{hotel.location}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-500" />
            <span className="font-semibold">{hotel.rating}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">{hotel.description}</p>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-xl font-semibold">{t("amenities")}</h2>
              <ul className="list-inside list-disc">
                {hotel.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold">{t("services")}</h2>
              <ul className="list-inside list-disc">
                {hotel.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">{t("facilities")}</h2>
            <ul className="list-inside list-disc">
              {hotel.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 rounded-lg bg-gray-100 p-4">
            <h2 className="mb-2 text-xl font-semibold">
              {t("contact_information")}
            </h2>
            <div className="mb-2 flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{hotel.contact.phone || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{hotel.contact.email || "N/A"}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">{t("wifi")}</h2>
            <div className="flex items-center">
              <Wifi size={16} className="mr-2" />
              <div>
                <p className="flex items-center">
                  <strong>{t("wifi_network")}:</strong> {hotel.wifi.networkName}
                </p>
                <p className="">
                  <strong>{t("wifi_password")}:</strong> {hotel.wifi.password}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">{t("house_rules")}</h2>
            <ul className="list-inside list-disc">
              {hotel.houseRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 flex items-center text-xl font-semibold">
              <Clock size={18} className="mr-2" />
              {t("check_out")}
            </h2>
            <p className="mb-2 ">
              {t("check_out_time", { time: hotel.checkOut.time })}
            </p>
            <ul className="list-inside list-disc">
              {hotel.checkOut.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">{t("reviews")}</h2>
            <p className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-500" />
              {t("reviews_message", { hotelName: hotel.name })}
            </p>
          </div>

          <div className="mt-6 text-center">
            <h2 className="mb-2 text-2xl font-bold">{t("thank_you")}</h2>
            <p>{t("thank_you_message")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelReviewMobile;
