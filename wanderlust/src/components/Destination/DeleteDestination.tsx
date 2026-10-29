
"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/GetTokenFromClient";

interface DeleteDestinationProps {
  destination: string | number;
}

const DeleteDestination = ({
  destination,
}: DeleteDestinationProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteDestination = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `http://localhost:8000/destination/${destination}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete destination."
        );
      }

      toast.success("Destination deleted successfully!");

      window.location.href = "/destination";
    } catch (error) {
      console.error("Error deleting destination:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete destination."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="border border-destructive/30 bg-white"
          >
            <Trash2 data-icon="inline-start" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this destination?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The destination will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault();
              void handleDeleteDestination();
            }}
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestination;