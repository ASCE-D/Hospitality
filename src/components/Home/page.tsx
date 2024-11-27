"use client";

import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ArrowBigRight, ArrowBigRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const HomePage = ({ host, house }: { host?: string; house?: string }) => {
  const t = useTranslations();
  const hostName = host || "els-capital";
  const houseName = house || "san-giorgio-1";

  const activities = [
    {
      title: t("homepage.activities.home_informations"),
      image: "/images/hotels/home-stay.jpg",
      url: "/homestay",
    },
    {
      title: t("homepage.activities.food"),
      image: "/images/restaurants/service-1.jpg",
      url: "/restaurants",
    },
    {
      title: t("homepage.activities.transports"),
      image: "/images/transport/cover.jpg",
      url: "/guest/transports",
    },
    {
      title: "AirParkings",
      image: "/images/tours/airparking.jpg",
      url: `https://airparking.tech/${hostName}/${houseName}`,
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow items-center justify-center p-4">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="mb-6 rounded-lg bg-yellow-400 p-4 text-black">
            <h1 className="text-md font-bold">
              {t("homepage.welcome_message")}
            </h1>
          </div>
          <div className="mx-auto grid h-[580px] grid-cols-2 gap-4 md:mx-16 md:grid-cols-4">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className={`
                  relative cursor-pointer overflow-hidden transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg
                  ${index === 0 ? "col-span-1 row-span-1" : ""}
                  ${index === 1 ? "col-span-1 row-span-2 md:row-span-1" : ""}
                  ${index === 2 ? "col-span-1 row-span-2 md:row-span-1" : ""}
                  ${index === 3 ? "col-span-1 row-span-1" : ""}
                `}
              >
                <Link href={activity.url}>
                  <CardContent className="flex h-full flex-col items-center justify-center p-0">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full rounded-xl object-cover"
                      width={200}
                      height={100}
                    />
                  </CardContent>
                </Link>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <p className="text-md text-center font-bold text-white">
                    {activity.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <Button className="mt-6 flex h-24 w-full items-center justify-center bg-yellow-400 p-4 text-black hover:bg-yellow-400">
            <Link
              href="/guest/services"
              className="flex items-center justify-center"
            >
              <div className="flex flex-col">
                {" "}
                <p className="mr-1 text-center text-2xl">
                  {t("homepage.manage_your_stay")}
                </p>
                <p className="mr-1 text-center text-sm">
                  Early check-in/ Late-checkout/ Luggage
                </p>
              </div>

              <ArrowBigRightIcon className="" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
