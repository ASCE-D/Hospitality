"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Star, Wifi, Clock } from "lucide-react";
import Image from "next/image";

const hotels = [
  {
    id: 0,
    name: "Luxury Resort & Spa",
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
    id: 1,
    name: "City Center Hotel",
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
    name: "Mountain Lodge",
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
    name: "Beachfront Bungalows",
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

const HotelDetails = ({ params }: { params: { id: string } }) => {
  const hotel = hotels.find((h) => h.id === parseInt(params.id));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

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
          {/* <Image
            src={hotel.images[0]}
            alt={hotel.name}
            className="mb-4 h-64 w-full rounded-lg object-cover"
          /> */}

          <p className="mb-4 text-gray-700">{hotel.description}</p>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-xl font-semibold">Amenities</h2>
              <ul className="list-inside list-disc">
                {hotel.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold">Services</h2>
              <ul className="list-inside list-disc">
                {hotel.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Facilities</h2>
            <ul className="list-inside list-disc">
              {hotel.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4 rounded-lg bg-gray-100 p-4">
            <h2 className="mb-2 text-xl font-semibold">Contact Information</h2>
            <div className="mb-2 flex items-center">
              <Phone size={16} className="mr-2" />
              <span>{hotel.contact.phone || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{hotel.contact.email || "N'A"}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-xl font-semibold">Contact details</h2>
              {/* <p>
                <strong>Host:</strong> {hotel.contact.host}
              </p> */}
              <p>
                <strong>Phone:</strong> {hotel.contact.phone}
              </p>
              <p>
                <strong>Email:</strong> {hotel.contact.email}
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold">Location</h2>
              <p className="flex items-center">
                <MapPin size={32} className="mr-2" />
                {hotel.location}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Wi-Fi</h2>
            <div className="flex items-center">
              {" "}
              <Wifi size={16} className="mr-2" />
              <div>
                {" "}
                <p className="flex items-center">
                  <strong>Network Name:</strong> {hotel.wifi.networkName}
                </p>
                <p className="">
                  <strong>Password:</strong> {hotel.wifi.password}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">House Rules</h2>
            <ul className="list-inside list-disc">
              {hotel.houseRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 flex items-center text-xl font-semibold">
              <Clock size={18} className="mr-2" />
              Check-out
            </h2>
            <p className="mb-2 ">Check out is {hotel.checkOut.time}</p>
            <ul className="list-inside list-disc">
              {hotel.checkOut.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Reviews</h2>
            <p className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-500" />
              If you enjoyed your time with us at {hotel.name}
            </p>
            <p>Please leave a review we&apos;d love to hear from you</p>
          </div>

          <div className="mt-6 text-center">
            <h2 className="mb-2 text-2xl font-bold">Thank you</h2>
            <p>We hope you enjoy your visit and made yourself at home.</p>
            <p>Thank you for choosing to stay with us.</p>
          </div>

          <div className="text-right">
            <span className="mr-2 text-2xl font-bold">{hotel.price}</span>
            <span className="text-gray-500">per night</span>
          </div>

          {/* <Button className="mt-4 w-full">Book Now</Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelDetails;
