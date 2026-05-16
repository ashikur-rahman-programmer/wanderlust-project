import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Card } from "@heroui/react";
import { FaEye } from "react-icons/fa6";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { authClient } from "@/lib/auth-client";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const bookings = await res.json();

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-gray-500 mt-2">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* বুকিং লিস্ট */}
      <div className="flex flex-col gap-6 w-8/12">
        {bookings.map((booking) => (
          // <BookingCard key={booking._id} booking={booking} user={user} />
          <Card
            key={booking._id}
            className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4"
          >
            <div className="p-0">
              <div className="flex flex-col md:flex-row gap-6 p-4">
                {/* ইমেজ সেকশন */}
                <div className="w-full md:w-72 h-48">
                  <Image
                    src={booking.imageUrl}
                    width={200}
                    height={200}
                    alt={booking.destinationName}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>

                {/* কন্টেন্ট সেকশন */}
                <div className="w-full py-2 flex flex-col justify-center space-y-5">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {booking.destinationName}
                    </h2>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Icon icon="lucide:calendar" className="text-lg" />
                        <span>
                          Departure:{" "}
                          {new Date(booking.departureDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Icon icon="lucide:ticket" className="text-lg" />
                        <span>Booking ID: {booking._id}</span>
                      </div>
                    </div>
                  </div>

                  {/* অ্যাকশন বাটনসমূহ */}
                  <div className="flex justify-between items-center gap-3">
                    <div className="mt-4 md:mt-0">
                      <span className="text-3xl font-bold text-cyan-600">
                        ${booking.price}
                      </span>
                    </div>
                    <div className="flex  justify-end gap-3 self-end md:self-center">
                      <BookingCancelAlert bookingId={booking._id} />
                      <Button variant="primary">
                        <FaEye /> View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
