"use client";

import { useRequireAuth } from "@/hooks/use-auth";
import { LoaderPage } from "@/components/ui/loader";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useRequireAuth("/login");

  if (!isAuthenticated) {
    return <LoaderPage message="Redirecting to login..." />;
  }

  return <>{children}</>;
}
