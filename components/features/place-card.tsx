"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { EcoPlace } from "@/types";

interface PlaceCardProps {
  place: EcoPlace;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/places/${place.id}`}>
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={place.imageUrls[0]}
            alt={place.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/places/${place.id}`}>
          <h3 className="font-semibold hover:text-primary">{place.name}</h3>
        </Link>
        <p className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 shrink-0" /> {place.location}, {place.region}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {place.rating}
          </span>
          <span className="text-muted-foreground text-sm">
            {place.availableSlots} slots
          </span>
        </div>
        <p className="mt-2 font-medium text-primary">
          {formatPrice(place.pricePerDay)} / day
        </p>
        <Button className="mt-4 w-full" variant="eco" asChild>
          <Link href={`/places/${place.id}`}>Book now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
