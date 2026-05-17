import Image from "next/image";
import { FaRegCalendar, FaStar, FaCheck } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { IoArrowBackOutline } from "react-icons/io5";
import Link from "next/link";
import { EditModal } from "@/components/EditModal";
import { AlertDialogCard } from "@/components/AlertDialogCard";
import BookingPage from "@/components/Booking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DestinationDetails = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({ headers: await headers() });
  const res = await fetch(`${process.env.SERVER_URL}/destination/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const destination = await res.json();

  const { destinationName, country, price, imageUrl, duration, description } =
    destination;

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Top Navigation / Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-gray-500 hover:text-black transition"
        >
          <IoArrowBackOutline /> Back to Destinations
        </Link>

        {/* edit and cancel buttons */}
        <div className="flex gap-3">
          <EditModal destination={destination} />

          <AlertDialogCard destination={destination} />
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[300 md:h-[500px] w-full mb-10 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Information */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-1 text-gray-500 mb-2 font-medium">
              <LuMapPin /> {country}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {destinationName}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-1">
                <FaStar className="text-green-600" />
                <span className="font-bold text-black">4.9</span> (234 reviews)
              </div>
              <div className="flex items-center gap-2">
                <FaRegCalendar /> {duration}
              </div>
            </div>
          </div>

          {/* Overview */}
          <section>
            <h3 className="text-2xl font-bold mb-3">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {description ||
                "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
            </p>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-2xl font-bold mb-4">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Luxury beachfront accommodation",
                "Traditional Balinese spa treatment",
                "Sunrise trek to Mount Batur",
                "Visit Uluwatu Temple at sunset",
                "Private beach dinner experience",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-600 font-medium"
                >
                  <FaCheck className="text-green-500 text-sm" /> {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Sidebar */}
        <div className="lg:col-span-1">
          <BookingPage destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
