"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data }: { data: any }) => {
        const role = data?.user?.user_metadata?.role;
        if (role !== "admin") router.replace("/login");
      })
      .catch(() => router.replace("/login"));

    const { data: listener } = supabase.auth.onAuthStateChange((_event: unknown, session: unknown) => {
      // On vérifie que la session existe et que le rôle est bien admin
      if (!session) router.replace("/login");
    });
    return () => {
      if (listener && listener.subscription && typeof listener.subscription.unsubscribe === 'function') {
        listener.subscription.unsubscribe();
      }
    };
  }, [router]);
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Espace Administrateur</h1>
      {/* Ajoutez ici le contenu et la gestion admin */}
      {children}
    </main>
  );
}
