"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  format,
  parse,
  isAfter,
  startOfDay,
  addMinutes,
  isBefore,
  parseISO,
  formatISO,
  isSameDay,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
import DatePicker from "react-datepicker";
import { Grid } from "lucide-react";

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
      (isSameDay(date, new Date()) || isAfter(startOfDay(date), startOfDay(new Date())))
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
  setIsDisabled,
}: {
  restaurantId: string;
  meal: BookingPeriod;
  handleReservationChange: any;
  step: number;
  setIsDisabled: any;
}) {
  const [bookingFor, setBookingFor] = useState<BookingPeriod>(meal);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState("1");
  const restaurant = restaurantsData.restaurants.find((r) => {
    if (r.id === restaurantId && r.mealType.includes(meal)) return r;
  });

  const hours = restaurant?.hours;
  const closed = restaurant?.closed;

  const { isDateAvailable, getAvailableTimeSlots } = useMemo(
    () => checkAvailability(hours, closed, bookingFor),
    [hours, closed, bookingFor],
  );

useEffect(() => {
  if (step === 1) {
    setIsDisabled(selectedDate === null);
  } else if (step === 2) {
    setIsDisabled(!selectedTime || !selectedSeats);
  }
}, [step, selectedSeats, selectedDate, selectedTime]);

  const handleDateSelect = useCallback(
    (date: any) => {
      setSelectedDate(date);
      setSelectedTime(null);
      setError(null);

      if (date) {
        const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        handleReservationChange("dateTime", formattedDate);
      }
    },
    [handleReservationChange],
  );

  const handleTimeSelect = useCallback(
    (time: string, e: any) => {
      e.preventDefault();
      setSelectedTime(time);
      setError(null);

      if (selectedDate) {
        const [hours, minutes] = time.split(":").map(Number);
        const updatedDate = new Date(selectedDate);
        updatedDate.setHours(hours, minutes, 0, 0);
        const formattedDateTime = format(
          updatedDate,
          "yyyy-MM-dd'T'HH:mm:ss'Z'",
        );
        handleReservationChange("dateTime", formattedDateTime);
      }
    },
    [selectedDate, handleReservationChange],
  );

  const handleSeatSelect = useCallback(
    (seats: string) => {
      setSelectedSeats(seats);
      setError(null);

      handleReservationChange("seats", parseInt(seats));
    },
    [selectedSeats, handleReservationChange],
  );

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const slots = getAvailableTimeSlots(selectedDate);
    return slots.map((date) => format(date, "HH:mm"));
  }, [selectedDate, getAvailableTimeSlots]);

  return (
    <Card>
      <CardContent className="w-80">
        <form className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label
                  htmlFor="bookingFor"
                  className="block text-sm font-medium"
                >
                  Booking For
                </label>
                {/* Booking type selection code here */}
              </div>

              <div>
                <label className="block text-sm font-medium">Select Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => !isDateAvailable(date)}
                  className="rounded-md border"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="h-12"
                      onClick={(e) => handleTimeSelect(time, e)}
                    >
                      {time}
                    </Button>
                  ))
                ) :(
                  <div className="col-span-4 text-center">
                    No available slots
                  </div>
                )}
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Grid className="h-4 w-4" />
                    <label htmlFor="seats" className="text-sm font-medium">
                      Number of Seats
                    </label>
                  </div>
                  <Select
                    value={selectedSeats}
                    onValueChange={handleSeatSelect}
                  >
                    <SelectTrigger id="seats" className="mt-2 w-full">
                      <SelectValue placeholder="Select seats" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {selectedTime && selectedSeats && (
                <p className="text-sm">
                  Selected: {selectedTime}, {selectedSeats} seat(s)
                </p>
              )}
            </div>
          )}

          {error && <div className="text-red-500">{error}</div>}
        </form>
      </CardContent>
    </Card>
  );
}


export default CalendarBookingForm;
