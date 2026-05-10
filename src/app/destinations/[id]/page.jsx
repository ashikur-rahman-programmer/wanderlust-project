import Image from "next/image";
import { FaRegCalendar, FaStar, FaCheck } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { EditModal } from "@/components/EditModal";
import { AlertDialogCard } from "@/components/AlertDialogCard";

const DestinationDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  const {
    destinationName,
    country,
    price,
    imageUrl,
    duration,
    description,
    departureDate,
  } = destination;

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
          <div className="border border-gray-100 rounded-xl p-8 shadow-sm sticky top-10">
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-cyan-500">
                  ${price}
                </span>
                <span className="text-gray-500 text-sm">per person</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md text-gray-700 font-medium border border-gray-100">
                {departureDate || "05/15/2026"}
              </div>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-md transition duration-300 flex items-center justify-center gap-2">
                Book Now <span>→</span>
              </button>
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
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
