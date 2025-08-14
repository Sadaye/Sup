"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function ParentPage() {
  const router = useRouter();
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'parent') router.replace('/login');
  }, [router]);
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Espace Parent</h1>
    </main>
  );
}
