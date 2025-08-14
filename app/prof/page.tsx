"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function ProfPage() {
  const router = useRouter();
  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'prof') router.replace('/login');
  }, [router]);
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Espace Professeur</h1>
    </main>
  );
}
