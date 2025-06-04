"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfPage({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: any }) => {
      const role = data?.user?.user_metadata?.role;
      if (role !== "prof") router.replace("/login");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
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
      <h1 className="text-3xl font-bold mb-6">Espace Professeur</h1>
      {/* Ajoutez ici le contenu et la gestion prof */}
      {children}
    </main>
  );
}
