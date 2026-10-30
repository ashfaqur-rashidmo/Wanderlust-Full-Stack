"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { SquarePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
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

const initialForm = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

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

const inputClasses = "bg-neutral-50";

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCancel = () => {
    setForm(initialForm);
    setSubmitted(false);
  };


const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const token = await getTokenFromClient();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    console.log(result);

    if (!res.ok) {
      throw new Error(result || "Failed to add destination");
    }

    toast.success("Destination added successfully!");

    setSubmitted(true);
  } catch (error) {
    console.error("Error adding destination:", error);
  }
};


  return (
    <main className="flex-1 px-6 pt-8 pb-16 sm:px-10 lg:px-14">
      <h1 className="font-display text-4xl text-neutral-900 sm:text-5xl">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 w-full max-w-2xl rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-5">
          <Field id="destination-name" label="Destination Name">
            <Input
              id="destination-name"
              placeholder="Bali Paradise"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              className={inputClasses}
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
              />
            </Field>

            <Field id="category" label="Category">
              <Select
                value={form.category}
                onValueChange={(value) => {
                  if (value !== null) setField("category", value);
                }}
              >
                <SelectTrigger id="category" aria-label="Category" className={`w-full ${inputClasses}`}>
                  <SelectValue />
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
              />
            </Field>

            <Field id="duration" label="Duration">
              <Input
                id="duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(event) => setField("duration", event.target.value)}
                className={inputClasses}
              />
            </Field>
          </div>

          <Field id="departure-date" label="Departure Date">
            <Input
              id="departure-date"
              type="date"
              value={form.departureDate}
              onChange={(event) => setField("departureDate", event.target.value)}
              className={inputClasses}
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
            />
          </Field>

          <Field id="description" label="Description">
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              rows={6}
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              className={`min-h-28 resize-none ${inputClasses}`}
            />
          </Field>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="destructive"
              size="lg"
              className="border border-destructive/30 bg-white text-destructive hover:bg-destructive/10"
              onClick={handleCancel}
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>

            <Button
              type="submit"
              size="lg"
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <SquarePlus data-icon="inline-start" />
              Add Travel Package
            </Button>
          </div>
        </div>
      </form>

      {submitted && (
        <p className="mx-auto mt-4 max-w-2xl text-sm text-cyan-700">
          Travel package added (pending backend integration).
        </p>
      )}
    </main>
  );
}
