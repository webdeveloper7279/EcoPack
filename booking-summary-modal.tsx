"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDate } from "@/lib/utils";

interface BookingSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  subtotal: number;
  coinsUsed: number;
  discountApplied: number;
  totalPrice: number;
  onConfirm: () => void;
  loading?: boolean;
}

export function BookingSummaryModal({
  open,
  onOpenChange,
  placeName,
  checkIn,
  checkOut,
  guests,
  subtotal,
  coinsUsed,
  discountApplied,
  totalPrice,
  onConfirm,
  loading = false,
}: BookingSummaryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking summary</DialogTitle>
          <DialogDescription>{placeName}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in</span>
            <span>{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out</span>
            <span>{formatDate(checkOut)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests</span>
            <span>{guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {coinsUsed > 0 && (
            <>
              <div className="flex justify-between text-amber-600">
                <span>Coins used ({coinsUsed})</span>
                <span>-{formatPrice(discountApplied)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between border-t border-border pt-2 font-semibold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="eco" onClick={onConfirm} disabled={loading}>
            {loading ? "Confirming..." : "Confirm booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
