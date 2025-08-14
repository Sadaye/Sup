"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

const news = [
  {
    id: 1,
    title: "Conférence internationale sur l'IA à SupIGA",
    date: "15 avril 2025",
    category: "Évènement",
    excerpt: "SupIGA accueille des experts internationaux pour une conférence sur les dernières avancées en intelligence artificielle.",
    image: "/photo_2025-06-02_15-13-21 (2).jpg"
  },
  {
    id: 2,
    title: "Nouveau partenariat avec Microsoft",
    date: "28 mars 2025",
    category: "Partenariat",
    excerpt: "SupIGA annonce un partenariat stratégique avec Microsoft pour renforcer son programme de formation en cloud computing.",
    image: "/photo_2025-06-02_15-13-22.jpg"
  },
  {
    id: 3,
    title: "Ouverture des inscriptions 2025-2026",
    date: "10 mars 2025",
    category: "Admissions",
    excerpt: "Les inscriptions pour l'année académique 2025-2026 sont désormais ouvertes pour tous les programmes.",
    image: "/photo_2025-06-02_15-13-24 (2).jpg"
  }
];

export default function NewsSection() {
  return (
    <section className="py-20">
      <div className="w-full max-w-site mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Actualités</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Restez informé des derniers événements et actualités de SupIGA.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0" asChild>
            <Link href="/news">
              Toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 glass px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                
                <div className="flex items-center mb-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.excerpt}</p>
                
                <Button variant="ghost" className="justify-start group pl-0" asChild>
                  <Link href={`/news/${item.id}`}>
                    Lire la suite
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}