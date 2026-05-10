"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export function AlertDialogCard({ destination }) {
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    redirect("/destinations");

    return data;
  };
  return (
    <AlertDialog>
      <Button
        variant="danger"
        className=" py-5 border border-red-200 text-red-500 rounded-md bg-transparent hover:bg-red-50"
      >
        <FiTrash2 /> Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{destination.destinationName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(destination._id)}
                slot="close"
                variant="danger"
              >
                Confirm Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
