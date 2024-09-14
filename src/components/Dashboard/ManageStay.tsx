"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Clock, Briefcase, Calendar, PlusCircle } from "lucide-react";
import { stripe } from "@/actions/stripe";
import { Description } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";

const ImproveYourStay = () => {
  const features = [
    {
      title: "Early Check-in",
      icon: Clock,
      description: "Arrive earlier and start your stay sooner",
      price: 30,
      unit: "per hour",
    },
    {
      title: "Luggage Deposit",
      icon: Briefcase,
      description: "Store your luggage securely before or after your stay",
      price: 10,
      unit: "per bag per day",
    },
    {
      title: "Late Checkout",
      icon: Clock,
      description: "Extend your last day and leave at your convenience",
      price: 40,
      unit: "per hour",
    },
    {
      title: "Extend Your Stay",
      icon: Calendar,
      description: "Add extra nights to your reservation",
      price: 150,
      unit: "per night",
    },
  ];

  const FeatureDrawer = ({ feature }: any) => {
    const [quantity, setQuantity] = useState(1);
    const [dateTime, setDateTime] = useState("");
    const [roomId, setRoomId] = useState("");
    const router = useRouter();
    const total = feature.price * quantity;
    const data = {
      roomid: 303,
      description: "4 hrs stay more",
      price: 50000,
      restaurantId: "cm0ner3ks0003htvdm9zzhwy3",
      extendedNights: "4",
    };

    const handleSubmit = async (data: any) => {
      const url = await stripe(JSON.stringify(data));
      if (url) {
        router.push(url); // Redirect to Stripe checkout page
      }
    };
    const renderFeatureSpecificFields = () => {
      switch (feature.title) {
        case "Luggage Deposit":
          return (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="quantity">Number of Bags</Label>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
              />
            </div>
          );
        case "Early Check-in":
        case "Late Checkout":
          return (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="dateTime">
                {feature.title === "Early Check-in" ? "Check-in" : "Check-out"}{" "}
                Time
              </Label>
              <Input
                type="datetime-local"
                id="dateTime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
          );
        case "Extend Your Stay":
          return (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="quantity">Number of Nights</Label>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
              />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Button className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add to Stay
      </Button>
      // <Drawer>
      //   <DrawerTrigger asChild>
      //   </DrawerTrigger>
      //   <DrawerContent>
      //     <DrawerHeader>
      //       <DrawerTitle>{feature.title}</DrawerTitle>
      //       <DrawerDescription>{feature.description}</DrawerDescription>
      //     </DrawerHeader>
      //     <div className="p-4 pb-0">
      //       <div className="grid w-full items-center gap-4">
      //         <div className="grid w-full items-center gap-1.5">
      //           <Label htmlFor="roomId">Room ID</Label>
      //           <Input
      //             id="roomId"
      //             value={roomId}
      //             onChange={(e) => setRoomId(e.target.value)}
      //           />
      //         </div>
      //         {renderFeatureSpecificFields()}
      //         <div>
      //           <p>
      //             Price: ${feature.price} {feature.unit}
      //           </p>
      //           <p className="font-bold">Total: ${total}</p>
      //         </div>
      //       </div>
      //     </div>
      //     <DrawerFooter>
      //       <DrawerClose asChild>
      //         <Button onClick = {() =>handleSubmit(data)}>Confirm</Button>
      //       </DrawerClose>
      //     </DrawerFooter>
      //   </DrawerContent>
      // </Drawer>
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-[80px] md:pt-[130px] lg:pt-[160px]">
      <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <feature.icon className="mr-2 h-6 w-4" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <FeatureDrawer feature={feature} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImproveYourStay;
