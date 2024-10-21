import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressFormProps {
  name: string;
  setName: (name: string) => void;
  address: string;
  setAddress: (address: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  name,
  setName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Delivery Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;