import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const HomePage = () => {
  const activities = [
    { title: "Home Informations", image: "/placeholder/150" },
    { title: "Food", image: "/placeholder/150" },
    { title: "Transports", image: "/placeholder/150" },
    { title: "City tours", image: "/placeholder/150" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow p-4">
        {/* <div className="mb-4 rounded-lg bg-yellow-400 p-4 text-white">
          <h1 className="text-md font-bold">
            Welcome to Sangiorgio Apartments❤️🌹
          </h1>
        </div> */}

        <Card className="mb-4">
          {/* just image of apartments & onClick redirected to details */}
          <CardContent className="p-0">
            <img
              src="/images/hotels/apartment.png"
              alt="Apartment"
              className="h-40 w-full rounded-lg object-cover"
            />
          </CardContent>
        </Card>
        <div className="mx-auto grid h-[540px] grid-cols-2 gap-4 md:grid-cols-4 md:mx-16">
          {activities.slice(0, 4).map((activity, index) => (
            <Card
              key={index}
              className={`
            cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg
            ${index === 0 ? "col-span-1 row-span-1" : ""}
            ${index === 1 ? "col-span-1 row-span-2 md:row-span-1" : ""}
            ${index === 2 ? "col-span-1 row-span-2 md:row-span-1" : ""}
            ${index === 3 ? "col-span-1 row-span-1" : ""}
          `}
            >
              <CardContent className="flex h-full flex-col items-center justify-center p-2">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="mb-2 h-16 w-16 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <p className="text-center text-sm">{activity.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-4 p-4">
          <Link href={"/guest/services"}>
            {" "}
            <CardContent className="justify-center">
              <p className="text-center text-black">manage your stay</p>
            </CardContent>
          </Link>
        </Card>
      </main>
    </div>
  );
};

export default HomePage;
