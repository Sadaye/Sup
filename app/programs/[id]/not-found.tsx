"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen } from "lucide-react";

export default function ProgramNotFound() {
  return (
    <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <GlassCard className="p-8">
            <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Programme introuvable</h1>
            <p className="text-muted-foreground mb-6">
              Le programme que vous recherchez n'existe pas ou a été supprimé.
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/programs">
                  <Search className="h-4 w-4 mr-2" />
                  Voir tous les programmes
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="w-full">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
