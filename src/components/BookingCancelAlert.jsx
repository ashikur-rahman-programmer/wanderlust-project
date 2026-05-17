"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

export function BookingCancelAlert({ bookingId }) {
  console.log(bookingId);
  const route = useRouter();
  const handleCancelBooking = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    route.refresh();

    return data;
  };

  return (
    <AlertDialog>
      <Button variant="danger">
        <FaRegTrashAlt /> Cancel Booking
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Delete Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
