"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, MapPin, Coins, Gamepad2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPlaces } from "@/lib/api";
import { useEffect, useState } from "react";
import type { EcoPlace } from "@/types";
import { formatPrice } from "@/lib/utils";
import { PlaceCardSkeleton } from "@/components/features/place-card-skeleton";

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-eco-subtle py-20 md:py-28">
      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-1.5 text-sm font-medium text-primary">
            <Leaf className="h-4 w-4" />
            Eco recreation &amp; mini games
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Book eco places.
            <br />
            <span className="text-primary">Play. Earn. Save.</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground md:text-xl">
            Discover eco resorts in Miraki, Shahrisabz and beyond. Play mini games, earn coins, and get discounts on your next booking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="eco" asChild>
              <Link href="/places">
                Explore places <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/games">Play eco games</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedPlaces({ places }: { places: EcoPlace[] }) {
  const featured = places.slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold">Featured eco places</h2>
        <p className="mt-2 text-muted-foreground">Hand-picked spots for a green getaway</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              <Link href={`/places/${place.id}`}>
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={place.imageUrls[0]}
                    alt={place.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" /> {place.location}
                  </p>
                  <p className="mt-2 font-medium text-primary">
                    {formatPrice(place.pricePerDay)} / day
                  </p>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button variant="outline" asChild>
          <Link href="/places">View all places</Link>
        </Button>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Book a place",
      description: "Choose from eco resorts in Miraki, Shahrisabz and more.",
      icon: MapPin,
    },
    {
      title: "Play mini games",
      description: "Recycle in games and earn eco coins.",
      icon: Gamepad2,
    },
    {
      title: "Use coins for discount",
      description: "1 coin = 1000 UZS off. Max 30% discount per booking.",
      icon: Coins,
    },
  ];

  return (
    <section className="border-t border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold">How it works</h2>
          <p className="mt-2 text-muted-foreground">Three simple steps to save and explore</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-eco text-white">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcoCoinSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-2xl gradient-eco-subtle border border-primary/20 p-8 text-center md:p-12"
      >
        <Coins className="mx-auto h-12 w-12 text-primary" />
        <h2 className="mt-4 text-2xl font-bold">Eco coins</h2>
        <p className="mt-2 text-muted-foreground">
          Earn coins by playing our recycling mini games. Use them when booking: <strong>1 coin = 1000 UZS</strong> discount. Maximum <strong>30%</strong> of the booking total can be covered by coins.
        </p>
        <Button className="mt-6" variant="eco" asChild>
          <Link href="/games">Start earning</Link>
        </Button>
      </motion.div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-border py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold">Ready to go green?</h2>
        <p className="mt-2 text-muted-foreground">Book your next eco stay or play games to earn coins.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="eco" asChild>
            <Link href="/places">Book a place</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/register">Create free account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [places, setPlaces] = useState<EcoPlace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlaces().then(setPlaces).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      {loading ? (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </div>
        </section>
      ) : (
        <FeaturedPlaces places={places} />
      )}
      <HowItWorks />
      <EcoCoinSection />
      <CTA />
    </>
  );
}
