import React from "react";
import { Star, MapPin, ThumbsUp, Activity } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

{
  /* <div className="mx-auto min-h-screen max-w-md bg-gray-100 p-8 pt-[80px] md:pt-[130px] lg:pt-[160px]"></div> */
}

const hotels = [
  {
    id: 0,
    name: "Luxury Resort & Spa",
    image: "/placeholder/400/300",
    description:
      "Experience ultimate relaxation in our 5-star resort with breathtaking ocean views.",
    price: "$299",
    rating: 4.8,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "Tmhbc.bom@tajhotels.com", phone: "022 6665 3366" },
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ae/c8/45/caption.jpg?w=1400&h=500&s=1",
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
  },
  {
    id: 1,
    name: "City Center Hotel",
    image: "/placeholder/400/300",
    description:
      "Stay in the heart of the city, walking distance from major attractions and business centers.",
    price: "$189",
    rating: 4.5,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "", phone: "" },
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ae/c8/45/caption.jpg?w=1400&h=500&s=1",
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
  },
  {
    id: 2,
    name: "Mountain Lodge",
    image: "/placeholder/400/300",
    description:
      "Escape to nature in our cozy lodge surrounded by stunning mountain landscapes.",
    price: "$159",
    rating: 4.6,
    location:
      "Apollo Bundar Opposite Gateway of India, Colaba, Mumbai 400001 India",
    contact: { email: "", phone: "" },
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ae/c8/45/caption.jpg?w=1400&h=500&s=1",
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
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
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ae/c8/45/caption.jpg?w=1400&h=500&s=1",
    ],
    amenities: [
      "Swimming pool",
      "Fitness center",
      "Restaurant",
      "Airport shuttle",
    ],
    services: ["Room service", "24/7 customer support"],
    facilities: ["Breakfast", "Free Wi-Fi", "Concierge service"],
    reviews: [{}],
  },
];

const HotelReviewMobile = () => {
  return (
    <div className="grid grid-cols-1 gap-4  p-8 pt-[80px] md:grid-cols-2 md:pt-[130px] lg:grid-cols-4 lg:pt-[160px]">
      {hotels.map((hotel, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="p-0">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="h-48 w-full object-cover"
            />
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="mb-2 text-lg font-semibold">{hotel.name}</h3>
            <div className="mb-6 flex items-center text-sm text-gray-500">
              <MapPin size={24} className="mr-1" />
              <span>{hotel.location}</span>
            </div>
            <p className="mb-2 text-sm text-gray-600">{hotel.description}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">{hotel.price} / night</span>
              <span className="text-yellow-500">★ {hotel.rating}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/homestay/${hotel.id}`} className="w-full">
              {" "}
              <Button className="w-full bg-yellow-400 text-black">
                Book Now
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HotelReviewMobile;
