"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Quote } from "lucide-react";

export default function DirectorMessage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <GlassCard variant="prominent" className="relative overflow-hidden">
            <Quote className="absolute top-6 left-6 h-24 w-24 text-primary/10 rotate-180" />
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg"
                    alt="Dr. Hanif POTHO, Directeur de SupIGA"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <blockquote className="text-lg md:text-xl text-foreground/90 italic mb-6">
                  &ldquo;À SupIGA, nous formons les leaders de demain en combinant excellence académique, 
                  innovation pédagogique et proximité avec le monde professionnel. Notre mission est de 
                  préparer nos étudiants à réussir dans un monde en perpétuelle évolution, en développant 
                  leur esprit critique, leur créativité et leur capacité d&apos;adaptation.&rdquo;
                </blockquote>
                
                <div className="flex flex-col">
                  <span className="font-semibold text-xl">Dr. Hanif POTHO</span>
                  <span className="text-muted-foreground">Directeur de SupIGA</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}