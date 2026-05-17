"use client";
import { useSession } from "@/lib/auth-client";
import { Button, DateField, Label } from "@heroui/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const BookingPage = ({ destination }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { price, _id, imageUrl, destinationName, duration, country } =
    destination;

  const [departureDate, setDepartureDate] = useState(null);

  const handleBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book!");
      return;
    }

    if (!departureDate) {
      toast.error("Please select a departure date.");
      return;
    }

    const bookingData = {
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      userId: user.id,
      price,
      _id,
      imageUrl,
      destinationName,
      duration,
      country,
      departureDate: new Date(departureDate),
    };

    const res = await fetch(`${process.env.SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();

    toast.success("Booking Successfully!");
  };

  return (
    <div className="border border-gray-100 rounded-xl p-8 shadow-sm sticky top-10">
      <div className="mb-6">
        <p className="text-gray-500 text-sm">Starting from</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-cyan-500">${price}</span>
          <span className="text-gray-500 text-sm">per person</span>
        </div>
      </div>

      <div className="space-y-4">
        <DateField
          onChange={setDepartureDate}
          className="w-[256px]"
          name="date"
        >
          <Label>Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>

        <Button onClick={handleBooking} variant="primary">
          Book Now <span>→</span>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {[
          "Free cancellation up to 7 days",
          "Travel insurance included",
          "24/7 customer support",
        ].map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <FaCheck className="text-green-500" /> {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
