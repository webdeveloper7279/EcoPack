"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderPage } from "@/components/ui/loader";
import { getPlaces, createPlace, updatePlace, deletePlace, getAllBookings } from "@/lib/api";
import { useToastStore } from "@/store";
import { formatPrice, formatDate } from "@/lib/utils";
import { LOCATIONS } from "@/lib/constants";
import type { EcoPlace, Booking } from "@/types";

function AdminContent() {
  const [places, setPlaces] = useState<EcoPlace[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [placeModalOpen, setPlaceModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<EcoPlace | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    region: "",
    description: "",
    pricePerDay: "",
    rating: "",
    imageUrls: "",
    amenities: "",
    availableSlots: "",
  });
  const addToast = useToastStore((s) => s.addToast);

  function loadData() {
    setLoading(true);
    Promise.all([getPlaces(), getAllBookings()]).then(([p, b]) => {
      setPlaces(p);
      setBookings(b);
      setLoading(false);
    });
  }

  useEffect(() => loadData(), []);

  function openAdd() {
    setEditingPlace(null);
    setFormData({
      name: "",
      location: LOCATIONS[0],
      region: "",
      description: "",
      pricePerDay: "",
      rating: "5",
      imageUrls: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      amenities: "WiFi, Parking",
      availableSlots: "10",
    });
    setPlaceModalOpen(true);
  }

  function openEdit(place: EcoPlace) {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      location: place.location,
      region: place.region,
      description: place.description,
      pricePerDay: String(place.pricePerDay),
      rating: String(place.rating),
      imageUrls: place.imageUrls.join("\n"),
      amenities: place.amenities.join(", "),
      availableSlots: String(place.availableSlots),
    });
    setPlaceModalOpen(true);
  }

  async function handleSave() {
    const price = Number(formData.pricePerDay) || 0;
    const rating = Number(formData.rating) || 5;
    const slots = Number(formData.availableSlots) || 1;
    const imageUrls = formData.imageUrls.split("\n").filter(Boolean);
    const amenities = formData.amenities.split(",").map((s) => s.trim()).filter(Boolean);

    if (!formData.name || !formData.location) {
      addToast("Name and location required", "error");
      return;
    }

    try {
      if (editingPlace) {
        await updatePlace(editingPlace.id, {
          name: formData.name,
          location: formData.location,
          region: formData.region,
          description: formData.description,
          pricePerDay: price,
          rating,
          imageUrls: imageUrls.length ? imageUrls : [formData.imageUrls],
          amenities,
          availableSlots: slots,
        });
        addToast("Place updated", "success");
      } else {
        await createPlace({
          name: formData.name,
          location: formData.location,
          region: formData.region,
          description: formData.description,
          pricePerDay: price,
          rating,
          imageUrls: imageUrls.length ? imageUrls : [formData.imageUrls],
          amenities,
          availableSlots: slots,
        });
        addToast("Place added", "success");
      }
      setPlaceModalOpen(false);
      loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Failed", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this place?")) return;
    try {
      await deletePlace(id);
      addToast("Place deleted", "success");
      loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Failed", "error");
    }
  }

  if (loading) return <LoaderPage />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="mt-1 text-muted-foreground">Manage places and view bookings</p>
        </div>
        <Button variant="eco" onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add place
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Places</CardTitle>
          <CardDescription>Eco places listed on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {places.map((place) => (
              <div
                key={place.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={place.imageUrls[0]}
                    alt=""
                    className="h-16 w-24 rounded object-cover"
                  />
                  <div>
                    <p className="font-semibold">{place.name}</p>
                    <p className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" /> {place.location}
                    </p>
                    <p className="text-sm">{formatPrice(place.pricePerDay)} / day</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(place)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(place.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>All reservations</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No bookings yet.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="flex flex-wrap justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-semibold">{b.placeName}</p>
                    <p className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" /> {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(b.totalPrice)}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={placeModalOpen} onOpenChange={setPlaceModalOpen}>
        <DialogContent showClose={true} className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPlace ? "Edit place" : "Add place"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                placeholder="Eco Resort Name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData((s) => ({ ...s, location: e.target.value }))}
                  placeholder="e.g. Miraki"
                />
              </div>
              <div className="grid gap-2">
                <Label>Region</Label>
                <Input
                  value={formData.region}
                  onChange={(e) => setFormData((s) => ({ ...s, region: e.target.value }))}
                  placeholder="e.g. Tashkent Region"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData((s) => ({ ...s, description: e.target.value }))}
                placeholder="Short description"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Price/day (UZS)</Label>
                <Input
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData((s) => ({ ...s, pricePerDay: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData((s) => ({ ...s, rating: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label>Slots</Label>
                <Input
                  type="number"
                  value={formData.availableSlots}
                  onChange={(e) => setFormData((s) => ({ ...s, availableSlots: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Image URLs (one per line)</Label>
              <textarea
                className="flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.imageUrls}
                onChange={(e) => setFormData((s) => ({ ...s, imageUrls: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Amenities (comma-separated)</Label>
              <Input
                value={formData.amenities}
                onChange={(e) => setFormData((s) => ({ ...s, amenities: e.target.value }))}
                placeholder="WiFi, Parking, Restaurant"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlaceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="eco" onClick={handleSave}>
              {editingPlace ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}
