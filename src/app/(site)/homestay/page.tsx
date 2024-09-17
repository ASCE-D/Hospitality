import React from "react";
import { Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const hotels = [
  {
    id: 0,
    name: "EL’s CAPITAL APARTMENTS",
    image: "/images/hotels/header.png",
    description:
      "EL’s Capital S.r.l. offers high-quality host services, ensuring an unforgettable stay thanks to our commitment, experience and attention to details. With precise knowledge of the area and a dedicated team, we strive to provide a welcoming environment and impeccable service for an authentic and unmatched experience. ",
    price: "$299", // Keeping this as is since no new price information was provided
    rating: 4.8, // Keeping this as is since no new rating information was provided
    location: "Vico Dei Cartai 1, int 5, 16123, Genova",
    contact: {
      email: "elscapitalpm@gmail.com",
      phone: "+39 328 363 1642",
    },
    images: [
      "/images/hotels/1.jpg",
      "/images/hotels/2.jpg",
      "/images/hotels/3.jpg",
      "/images/hotels/4.jpg",
    ], // Keeping this as is since no new image information was provided
    services: ["Room service", "24/7 customer support"], // Keeping these as is since no new service information was provided
    facilities: ["Free Wi-Fi", "Welcome Kit", "Self Check In"], // Keeping these as is since no new facility information was provided
    reviews: [{}], // Keeping this as is since no new review information was provided
    wifi: {
      networkName: "WIFI-Cartai",
      password: "1234567890",
    },
    houseRules: [
      "No smoking inside the property.",
      "No parties or events.",
      "No unregistered guests.",
      "Noise and the neighbourhood please be considerate",
    ],
    checkOut: {
      time: "10am",
      instructions: [
        "Please leave unit as found.",
        "Dishes placed in dishwasher",
        "Towel left on bathroom floor",
        "Turn off lights",
        "Close all windows",
        "Lock doors",
        "Notify host of departure",
      ],
    },
    host: {
      name: "ELS Capital",
      phone: "+39 328 363 1642",
      email: "elscapitalpm@gmail.com",
    },
    socialMedia: {
      instagram: "@palazzinasangiorgio",
    },
  },
];

const HotelReviewMobile = () => {
  const t = useTranslations("hotelReviewMobile");

  const hotel = hotels[0];

  return (
    <div className="container mx-auto p-4 ">
      <Card>
        <CardHeader>
          <Image alt="image" src={hotel.image} width={300} height={100} />
          <div className="grid grid-cols-2 gap-4">
            {hotel.images.map((image, index) => (
              <div key={index} className="h-48 w-full">
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover"
                  width={400}
                  height={100}
                />
              </div>
            ))}
          </div>
          <h1 className="mb-2 text-2xl font-bold">{hotel.name}</h1>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">{hotel.description}</p>
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
              <a href={`telto:${hotel.contact.phone}`}>
                {hotel.contact.phone || "N/A"}
              </a>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <a href={`mailto:${hotel.contact.email}`}>
                {hotel.contact.email || "N/A"}
              </a>
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
            <ul className="list-inside list-disc">
              <li>{t("check_out_time", { time: hotel.checkOut.time })}</li>
              {hotel.checkOut.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">{t("reviews")}</h2>
            <p className="flex items-center">
              If you enjoyed your time with EL’s Apartments, please leave a
              review, your feedback is important for us.
            </p>
          </div>

          <div className="t mt-6">
            <h2 className="mb-2 text-2xl font-bold">{t("thank_you")}</h2>
            <p className="flex items-center">
              We hope you enjoyed your visit and made yourself at home. Thank
              you for choosing to stay with us.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelReviewMobile;
