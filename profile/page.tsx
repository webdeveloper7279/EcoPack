"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store";
import { Coins } from "lucide-react";

function ProfileContent() {
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
            <Coins className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-2xl font-bold">{user.coins}</p>
              <p className="text-muted-foreground text-sm">Eco coins (1 coin = 1000 UZS discount, max 30%)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
