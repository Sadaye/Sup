"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Award, ChevronRight } from "lucide-react";
import { ParticlesCanvas } from "@/components/magic/ParticlesCanvas";
import HoloTitle from "@/components/magic/HoloTitle";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
      </div>
      
      <ParticlesCanvas />
      <div className="w-full max-w-site mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 glass-card rounded-full text-sm"
          >
            <span className="bg-primary/20 p-1 rounded-full mr-2">
              <GraduationCap className="h-3 w-3 text-primary" />
            </span>
            <span className="text-primary font-medium">Excellence académique depuis 2012</span>
          </motion.div>

          <HoloTitle
            leadingText="Formez-vous aux"
            emphasisText=" métiers d'avenir"
            className="mt-1"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-foreground/80 max-w-md"
          >
            SupIGA vous offre des formations d&apos;excellence en informatique, gestion et commerce pour répondre aux enjeux professionnels de demain.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/programs">Découvrir nos formations <ChevronRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass-button rounded-full px-6">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground/80">+30 Formations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground/80">+1000 Étudiants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground/80">80% d&apos;insertion</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="glass-card aspect-video rounded-2xl overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/UNIVERSITE SUP-IGA.jpg"
                alt="Bâtiment principal de SupIGA"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="glass-card absolute -bottom-6 -left-6 p-4 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-foreground/70">Classement national</p>
                <p className="font-semibold">Top 10 des écoles</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}