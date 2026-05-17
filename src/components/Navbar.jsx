"use client";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };
  return (
    <div className="bg-white w-full sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center py-3">
        <ul className="flex gap-3">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/destinations"}>Destinations</Link>
          </li>
          <li>
            <Link href={"/my-bookings"}>My Bookings</Link>
          </li>

          <li>
            <Link href={"/add-destination"}>Add Destination</Link>
          </li>
        </ul>

        <div>
          <Image
            src={"/assets/Wanderlast.png"}
            height={150}
            width={150}
            alt="logo"
          />
        </div>

        <ul className="flex items-center justify-center gap-3">
          <li>
            <Link href={"/profile"}>Profile</Link>
          </li>
          {user ? (
            <>
              {" "}
              <li>hey, {user?.name}</li>
              <li>
                <Button onClick={handleSignOut} variant="danger">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
              <li>
                <Link href={"/signup"}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
