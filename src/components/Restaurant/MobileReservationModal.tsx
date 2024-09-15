import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define types
type Restaurant = {
  name: string;
};

type ReservationDetails = {
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  seats: string;
  dateTime: Date | null;
};

type MobileReservationModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant: Restaurant;
  onSubmit: (details: ReservationDetails) => void;
};

const MobileReservationModal: React.FC<MobileReservationModalProps> = ({
  isOpen,
  onOpenChange,
  restaurant,
  onSubmit,
}) => {
  const [reservationDetails, setReservationDetails] =
    React.useState<ReservationDetails>({
      firstName: "",
      lastName: "",
      countryCode: "",
      phoneNumber: "",
      seats: "",
      dateTime: null,
    });

  const handleReservationChange = (
    field: keyof ReservationDetails,
    value: string | Date | null,
  ) => {
    setReservationDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleMakeReservation = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reservationDetails);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Reservation</DialogTitle>
          <DialogDescription>
            Reserve a table at {restaurant.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleMakeReservation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={reservationDetails.firstName}
                onChange={(e) =>
                  handleReservationChange("firstName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={reservationDetails.lastName}
                onChange={(e) =>
                  handleReservationChange("lastName", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="countryCode">Country Code</Label>
              <Select
                value={reservationDetails.countryCode}
                onValueChange={(value) =>
                  handleReservationChange("countryCode", value)
                }
              >
                <SelectTrigger id="countryCode">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1 (US)</SelectItem>
                  <SelectItem value="+44">+44 (UK)</SelectItem>
                  <SelectItem value="+91">+91 (India)</SelectItem>
                  <SelectItem value="+86">+86 (China)</SelectItem>
                  <SelectItem value="+81">+81 (Japan)</SelectItem>
                  <SelectItem value="+49">+49 (Germany)</SelectItem>
                  <SelectItem value="+33">+33 (France)</SelectItem>
                  <SelectItem value="+7">+7 (Russia)</SelectItem>
                  <SelectItem value="+55">+55 (Brazil)</SelectItem>
                  <SelectItem value="+61">+61 (Australia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={reservationDetails.phoneNumber}
                onChange={(e) =>
                  handleReservationChange("phoneNumber", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seats">Number of Seats</Label>
            <Select
              value={reservationDetails.seats}
              onValueChange={(value) => handleReservationChange("seats", value)}
            >
              <SelectTrigger id="seats">
                <SelectValue placeholder="Select seats" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTime">Select Date and Time</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={
                reservationDetails.dateTime
                  ? reservationDetails.dateTime.toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                handleReservationChange("dateTime", new Date(e.target.value))
              }
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-yellow-400 text-black">
              Submit Reservation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MobileReservationModal;
