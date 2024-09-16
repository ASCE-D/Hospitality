"use client";

import React, { useEffect, useRef, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Briefcase, PlusCircle } from "lucide-react";
import { stripe } from "@/actions/stripe";
import { useRouter } from "next/navigation";

interface Feature {
  title: string;
  icon: React.ElementType;
  description: string;
  price: number;
  unit: string;
}

const ImproveYourStay = () => {
  const features: Feature[] = [
    {
      title: "Early Check-in",
      icon: Clock,
      description: "Arrive earlier and start your stay sooner",
      price: 10,
      unit: "fixed price",
    },
    {
      title: "Luggage Deposit",
      icon: Briefcase,
      description: "Store your luggage securely before or after your stay",
      price: 5,
      unit: "fixed price",
    },
    {
      title: "Late Checkout",
      icon: Clock,
      description: "Extend your last day and leave at your convenience",
      price: 10,
      unit: "fixed price",
    },
  ];

  const FeatureDrawer = ({ feature }: { feature: Feature }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const router = useRouter();

    const contentRef = useRef<any>(null);

    useEffect(() => {
      // Prevent zooming
      const metaViewport = document.querySelector("meta[name=viewport]");
      const originalContent = metaViewport!.getAttribute("content");
      metaViewport!.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      );

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
    }, []);

    const handleSubmit = async () => {
      const data = {
        firstName,
        lastName,
        feature: feature.title,
        price: feature.price,
      };
      const url = await stripe(data);
      if (url) {
        router.push(url); // Redirect to Stripe checkout page
      }
    };

    const renderFeatureSpecificFields = () => {
      switch (feature.title) {
        case "Early Check-in":
          return (
            <>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date">Day</Label>
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="time">Time (12 PM onwards)</Label>
                <Input
                  type="time"
                  id="time"
                  min="12:00"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </>
          );
        case "Luggage Deposit":
          return (
            <p>Available from 10 AM. Fixed price: {feature.price} Euros</p>
          );
        case "Late Checkout":
          return (
            <p>Available until 1 PM. Fixed price: {feature.price} Euros</p>
          );
        default:
          return null;
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Stay
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{feature.title}</DialogTitle>
            <DialogDescription>{feature.description}</DialogDescription>
          </DialogHeader>
          <div className="p-4 pb-0">
            <div className="grid w-full items-center gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              {renderFeatureSpecificFields()}
              <div>
                <p className="font-bold">Total: {feature.price} Euros</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="bg-yellow-400 text-black">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
