"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  format,
  parse,
  isAfter,
  startOfDay,
  addMinutes,
  isBefore,
  parseISO,
  formatISO,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import restaurantsData from "@/utils/restaurants.json";
import { fromZonedTime } from "date-fns-tz";
import { Card, CardContent } from "./ui/card";

type ClosedPeriods = {
  LUNCH: string[];
  DINNER: string[];
};

type BookingPeriod = "LUNCH" | "DINNER";

type WorkingHours = {
  start: string;
  end: string;
};

function checkAvailability(
  hours?: string,
  closed?: ClosedPeriods,
  bookingFor?: BookingPeriod,
) {
  let morning: WorkingHours | undefined;
  let evening: WorkingHours | undefined;

  if (hours) {
    const parseTimeRange = (range: string): WorkingHours | undefined => {
      const parts = range.split("-");
      if (parts.length !== 2) return undefined;
      const [start, end] = parts.map((time) => time.trim());
      return { start, end };
    };

    if (hours.includes(" | ")) {
      const [morningHours, eveningHours] = hours.split(" | ");
      morning = parseTimeRange(morningHours);
      evening = parseTimeRange(eveningHours);
    } else {
      morning = parseTimeRange(hours);
    }
  }

  const isDateAvailable = (date: Date): boolean => {
    if (!closed || !bookingFor) return true;
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    return (
      !closed[bookingFor].includes(dayOfWeek) &&
      isAfter(startOfDay(date), startOfDay(new Date()))
    );
  };

  const getAvailableTimeSlots = (date: Date): Date[] => {
    // console.log("morning", morning, "evening", evening);
    if (!bookingFor || (!morning && !evening)) return [];
    const workingHours = bookingFor === "LUNCH" ? morning : evening || morning;
    if (!workingHours) return [];

    const { start, end } = workingHours;

    const startTime = parse(start, "HH:mm", date);
    const endTime = parse(end, "HH:mm", date);

    const timeSlots: Date[] = [];
    let currentSlot = startTime;

    while (isBefore(currentSlot, endTime)) {
      if (isAfter(currentSlot, new Date())) {
        timeSlots.push(new Date(currentSlot));
      }
      currentSlot = addMinutes(currentSlot, 30);
    }

    // console.log("w", workingHours);
    return timeSlots;
  };

  return {
    isDateAvailable,
    getAvailableTimeSlots,
  };
}

function CalendarBookingForm({
  restaurantId,
  meal,
  handleReservationChange,
  step,
}: {
  restaurantId: string;
  meal: BookingPeriod;
  handleReservationChange: any;
  step: number;
}) {
  const [bookingFor, setBookingFor] = useState<BookingPeriod>(meal);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [selectedTime, setSelectedTime] = useState<any>(new Date());
  const [error, setError] = useState<string | null>(null);

  const restaurant = restaurantsData.restaurants.find((r) => {
    if (r.id === restaurantId && r.mealType.includes(meal)) return r;
  });

  const hours = restaurant?.hours;
  const closed = restaurant?.closed;

  const { isDateAvailable, getAvailableTimeSlots } = useMemo(
    () => checkAvailability(hours, closed, bookingFor),
    [hours, closed, bookingFor],
  );

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date || null);
    setSelectedTime(null);
    setError(null);
  }, []);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTime(time);
    setError(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      // Parse the selected time
      const [hours, minutes] = selectedTime.split(":").map(Number);

      // Create a new Date object with the selected date and time in local time
      const localDateTime = new Date(selectedDate);
      localDateTime.setHours(hours, minutes, 0, 0);

      // Convert local time to UTC
      const utcDateTime = fromZonedTime(
        localDateTime,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      );

      // Format the UTC date and time without timezone information
      const formattedDateTime = format(utcDateTime, "yyyy-MM-dd'T'HH:mm:ss'Z'");

      console.log("Booking submitted:", {
        bookingFor,
        dateTime: formattedDateTime,
      });

      // Update parent component with the selected date and time in UTC
      handleReservationChange.dateTime("dateTime", formattedDateTime);
    } else {
      setError("Please select both a date and time");
    }
  };
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const slots = getAvailableTimeSlots(selectedDate);
    // console.log("Available time slots:", slots);
    return slots.map((date) => format(date, "HH:mm"));
  }, [selectedDate, getAvailableTimeSlots]);

  return (
    <Card>
      <CardContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="bookingFor"
                  className="block text-sm font-medium"
                >
                  Booking For
                </label>
                {/* <Select
              value={bookingFor}
              onValueChange={(value) => setBookingFor(value as BookingPeriod)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select booking type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LUNCH">Lunch</SelectItem>
                <SelectItem value="DINNER">Dinner</SelectItem>
              </SelectContent>
            </Select> */}
              </div>

              <div>
                <label className="block text-sm font-medium">Select Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => !isDateAvailable(date)}
                  className="rounded-md border"
                />
                </div>
            </>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="time" className="block text-sm font-medium">
                Select Time
              </label>
              <Select
                value={selectedTime || ""}
                onValueChange={handleTimeSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
}

export default CalendarBookingForm;
