
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Destination } from "@/lib/destination";
import { getTokenFromClient } from "@/lib/GetTokenFromClient";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Luxury",
  "Family",
] as const;

const inputClasses = "bg-neutral-50";



interface EditDestinationDialogProps {
  destination: Destination;
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export default function EditDestinationDialog({
  destination,
}: EditDestinationDialogProps) {
  const [form, setForm] = useState<Destination>(destination);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const setField = (field: keyof Destination, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Do not send MongoDB's immutable _id field in the update body.
    const { _id, ...updatedData } = form;

    const token = await getTokenFromClient();

    // Keep price numeric if it was entered in the number input.
    const dataToUpdate = {
      ...updatedData,
      price: Number(updatedData.price),
    };

    try {
      const res = await fetch(
        `http://localhost:8000/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update destination."
        );
      }

      toast.success("Destination updated successfully!");
      setOpen(false);

      // Refresh the page to display the updated destination.
      window.location.reload();
    } catch (error) {
      console.error("Error updating destination:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update destination."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline" size="lg">
            <Pencil data-icon="inline-start" />
            Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit destination</DialogTitle>
          <DialogDescription>
            Update the information for this travel destination.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col gap-5">
            <Field id="destination-name" label="Destination Name">
              <Input
                id="destination-name"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(event) => setField("name", event.target.value)}
                className={inputClasses}
                required
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="country" label="Country">
                <Input
                  id="country"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={(event) => setField("country", event.target.value)}
                  className={inputClasses}
                  required
                />
              </Field>

              <Field id="category" label="Category">
                <Select
                  value={form.category}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setField("category", value);
                    }
                  }}
                >
                  <SelectTrigger
                    id="category"
                    aria-label="Category"
                    className={`w-full ${inputClasses}`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="price" label="Price (USD)">
                <Input
                  id="price"
                  type="number"
                  min={0}
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) => setField("price", event.target.value)}
                  className={inputClasses}
                  required
                />
              </Field>

              <Field id="duration" label="Duration">
                <Input
                  id="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) => setField("duration", event.target.value)}
                  className={inputClasses}
                  required
                />
              </Field>
            </div>

            <Field id="departure-date" label="Departure Date">
              <Input
                id="departure-date"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  setField("departureDate", event.target.value)
                }
                className={inputClasses}
                required
              />
            </Field>

            <Field id="image-url" label="Image URL">
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => setField("imageUrl", event.target.value)}
                className={inputClasses}
                required
              />
            </Field>

            <Field id="description" label="Description">
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                rows={6}
                value={form.description}
                onChange={(event) =>
                  setField("description", event.target.value)
                }
                className={`min-h-28 resize-none ${inputClasses}`}
                required
              />
            </Field>

            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <X data-icon="inline-start" />
                    Cancel
                  </Button>
                }
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-600 text-white hover:bg-cyan-700"
              >
                <Save data-icon="inline-start" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}