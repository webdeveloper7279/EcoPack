"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaceCard } from "@/components/features/place-card";
import { LoaderPage } from "@/components/ui/loader";
import { PlaceCardSkeleton } from "@/components/features/place-card-skeleton";
import { getPlaces } from "@/lib/api";
import { LOCATIONS } from "@/lib/constants";
import type { EcoPlace } from "@/types";

export default function PlacesPage() {
  const [places, setPlaces] = useState<EcoPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minRating, setMinRating] = useState<string>("any");

  useEffect(() => {
    setLoading(true);
    getPlaces({
      search: search || undefined,
      location: location === "all" ? undefined : location,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating && minRating !== "any" ? Number(minRating) : undefined,
    })
      .then(setPlaces)
      .finally(() => setLoading(false));
  }, [search, location, minPrice, maxPrice, minRating]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Eco places</h1>
        <p className="mt-1 text-muted-foreground">Find and book your next green getaway</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={minRating} onValueChange={setMinRating}>
          <SelectTrigger className="w-full md:w-[140px]">
            <SelectValue placeholder="Select min rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="4.5">4.5+</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-28"
          />
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-28"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PlaceCardSkeleton key={i} />
          ))}
        </div>
      ) : places.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          No places match your filters. Try adjusting search or filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
