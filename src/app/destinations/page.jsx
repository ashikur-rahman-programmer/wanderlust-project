import DestinationCard from "@/components/DestinationCard";
import { Select, SelectItem } from "@heroui/react";

const DestinationsPage = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/destination`);
  const destinations = await res.json();

  return (
    <div className="container mx-auto p-5 md:p-10">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
          Explore All Destinations
        </h1>
        <p className="text-gray-500">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-6 border border-gray-200 rounded-none overflow-hidden">
        <div className="border-r border-gray-200">
          <select className="w-full p-4 outline-none appearance-none text-gray-500 uppercase text-sm tracking-widest bg-white">
            <option>Category</option>
            <option>Beach</option>
            <option>Mountain</option>
          </select>
        </div>
        <div className="border-r border-gray-200">
          <select className="w-full p-4 outline-none appearance-none text-gray-500 uppercase text-sm tracking-widest bg-white">
            <option>Price Range</option>
            <option>$0 - $1000</option>
            <option>$1000+</option>
          </select>
        </div>
        <div>
          <select className="w-full p-4 outline-none appearance-none text-gray-500 uppercase text-sm tracking-widest bg-white">
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-500 mb-8">
        Showing {destinations?.length || 0} destinations
      </p>

      {/* Destinations Grid */}
      {destinations && destinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed rounded-xl">
          <h2 className="text-xl text-gray-500">No destinations found!</h2>
          <p className="text-gray-400">Please add some destinations.</p>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
