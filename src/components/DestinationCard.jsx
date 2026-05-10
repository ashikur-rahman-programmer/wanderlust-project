import { Button } from "@heroui/react";
import { FiArrowUpRight } from "react-icons/fi"; // ছবির মতো আইকন
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar, FaStar } from "react-icons/fa6"; // স্টার আইকন যুক্ত করা হয়েছে
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const { _id, imageUrl, price, destinationName, duration, country } =
    destination;

  return (
    <div className="bg-white overflow-hidden transition-all duration-300 group max-w-[350px]">
      {/* Image Container with Rating Badge */}
      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <Image
          alt={destinationName}
          src={imageUrl}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Rating Badge (Top Right) */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <span className="font-bold text-sm">4.5</span>
          <FaStar className="text-black text-xs" />
        </div>
      </div>

      {/* Content Section */}
      <div className="py-4 space-y-2">
        {/* Country with Icon */}
        <div className="flex items-center gap-1 text-gray-500 font-medium">
          <LuMapPin className="text-lg" />
          <span className="text-base">{country}</span>
        </div>

        {/* Name and Price Row */}
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
            {destinationName}
          </h2>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-500 text-xs block">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex gap-2 items-center text-gray-500 font-medium">
          <FaRegCalendar className="text-lg" />
          <span>{duration}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/destinations/${_id}`}>
            <button className="flex items-center gap-1 text-cyan-500 font-bold uppercase tracking-wider text-sm border-b-2 border-cyan-500 pb-1 hover:text-cyan-600 hover:border-cyan-600 transition-colors">
              BOOK NOW <FiArrowUpRight className="text-xl" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
